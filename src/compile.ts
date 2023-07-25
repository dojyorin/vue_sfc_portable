/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, type DefExp, minifyScript, evaluateESM, randomBin, hexEncode} from "../deps.ts";

function parseHtml(html:string){
    return new DOMParser().parseFromString(html, "text/html");
}

function findComponent<T extends typeof HTMLElement>(elements:Element[], type:T){
    return <InstanceType<T> | undefined>elements.find(e => e instanceof type);
}

async function importComponent(script:string){
    const {code} = await minifyScript(script);
    const {default: component} = await evaluateESM<DefExp<Component>>(code ?? "");

    return component;
}

/**
* Compile from string of SFC structure.
* @example
* ```ts
* export default defineComponent({
*     components: {
*         "my-input": await compileComponent("<template>...</template>". "./component.vue")
*     }
* });
* ```
*/
export async function compileComponent(sfc:string, path?:string):Promise<Component>{
    const {head: {children: [...elements]}} = parseHtml(sfc);

    const template = findComponent(elements, HTMLTemplateElement);
    const script = findComponent(elements, HTMLScriptElement);
    const style = findComponent(elements, HTMLStyleElement);

    if(!template){
        throw new Error();
    }

    if(script?.innerHTML){
        script.innerHTML = script.innerHTML.replace(/"\.{0,2}\/(\\"|[^"\r\n\t ])+"|'\.{0,2}\/(\\'|[^'\r\n\t ])+'|`\.{0,2}\/(\\`|[^`\r\n\t ])+`/g, (sub)=>{
            const [quote] = sub;
            const link = decodeURIComponent([path ?? "", sub.slice(1, -1)].reduce((a, b) => new URL(b, a).href, location.href));

            return `${quote}${link.replace(new RegExp(quote, "g"), `\\${quote}`)}${quote}`;
        });
    }

    if(style?.innerHTML && style.hasAttribute("scoped")){
        const scope = `data-v-${hexEncode(randomBin(4))}`;

        for(const {attributes} of template.content.querySelectorAll("[class]")){
            attributes.setNamedItem(document.createAttribute(scope));
        }

        for(const rule of style.sheet?.cssRules ?? []){
            if(!(rule instanceof CSSStyleRule)){
                continue;
            }

            rule.selectorText += `[${scope}]`;
        }
    }

    if(style?.sheet?.cssRules){
        const element = document.createElement("style");

        for(const {cssText} of style.sheet.cssRules){
            element.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(element);
    }

    return {
        template: template.innerHTML,
        ...await importComponent(script?.innerHTML ?? "")
    };
}