/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, randomBin, hexEncode} from "../deps.ts";

function findPart<T extends typeof HTMLElement>(elements:Element[], type:T){
    return <InstanceType<T> | undefined>elements.find(e => e instanceof type);
}

/**
* Compile from string of SFC structure.
* @example
* ```ts
* export default defineComponent({
*     components: {
*         "my-input": await compileComponent("<template>...</template>")
*     }
* });
* ```
*/
export async function compileComponent(sfc:string, path?:string):Promise<Component>{
    const {head: {children: [...elements]}} = new DOMParser().parseFromString(sfc, "text/html");

    const template = findPart(elements, HTMLTemplateElement);
    const script = findPart(elements, HTMLScriptElement);
    const style = findPart(elements, HTMLStyleElement);

    if(!template){
        throw new Error();
    }

    if(script?.innerHTML){
        script.innerHTML = script.innerHTML.replace(/"\.{0,2}\/(\\"|[^"\r\n\t ])+"|'\.{0,2}\/(\\'|[^'\r\n\t ])+'|`\.{0,2}\/(\\`|[^`\r\n\t ])+`/g, (sub)=>{
            const [quote] = sub;
            const name = sub.replace(/^["'`]/, "").replace(/["'`]$/, "");

            return `${quote}${decodeURIComponent(new URL(name, new URL(path ?? "", location.href)).href).replace(new RegExp(quote, "g"), `\\${quote}`)}${quote}`;
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
        ...(await import(`data:text/javascript;base64,${btoa(script?.innerHTML ?? "")}`)).default
    };
}