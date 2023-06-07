/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type FetchInit, type Component, fetchExtend, randomUuid, trimExtend} from "../deps.ts";

const AsyncFunction = <FunctionConstructor>(async function(){}).constructor;

export function parseComponent(sfc:string):Component{
    const {head: {children: [...elements]}} = new DOMParser().parseFromString(sfc, "text/html");
    const templateComponent = <HTMLTemplateElement | undefined>elements.find(e => e instanceof HTMLTemplateElement);
    const scriptComponent = <HTMLScriptElement | undefined>elements.find(e => e instanceof HTMLScriptElement);
    const styleComponent = <HTMLStyleElement | undefined>elements.find(e => e instanceof HTMLStyleElement);

    if(styleComponent){
        const element = document.createElement("style");

        if(styleComponent.hasAttribute("scoped")){
            const scope = `data-v-${randomUuid().split(/-/)[0]}`;

            for(const {attributes} of templateComponent?.content.querySelectorAll("[class]") ?? []){
                attributes.setNamedItem(document.createAttribute(scope));
            }

            for(const rule of styleComponent.sheet?.cssRules ?? []){
                if(!(rule instanceof CSSStyleRule)){
                    continue;
                }

                rule.selectorText = `${rule.selectorText}[${scope}]`;
            }
        }

        for(const {cssText} of styleComponent.sheet?.cssRules ?? []){
            element.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(element);
    }

    const js = scriptComponent?.innerHTML.replace(/import[^;]+from[^;]+;/g, (sub)=>{
        const source = trimExtend(sub.replace(/[\n\t]/g, " "));

        const matchAssert = /assert {0,1}{ {0,1}type {0,1}: {0,1}["'`][a-zA-Z]+["'`] {0,1}}/;
        const matchExport = /[a-zA-Z_$][a-zA-Z0-9_$]+/;

        const assert = source.match(matchAssert)?.[0] ?? "";
        const [part, name] = source.replace(matchAssert, "").replace(/^import/, "").replace(/["'] {0,1};$/, "").split(/from {0,1}["']/, 2).map(v => v.trim());

        const fragment = (()=>{
            if(/^\*/.test(part)){
                return part.match(matchExport)?.[0] ?? "";
            }
            else if(/^[a-zA-Z_$]/.test(part)){
                return `{default: ${part.match(matchExport)?.[0] ?? ""}}`;
            }
            else if(/^{/.test(part)){
                return part.replace(/ as /, ": ");
            }
            else{
                return "";
            }
        })();

        return `const ${fragment} = await import("${name}", {${assert}});`;
    }).replace(/"\.{0,2}\/(\\"|[^"])+"|'\.{0,2}\/(\\'|[^'])+'|`\.{0,2}\/(\\`|[^`])+`/g, (sub)=>{
        const [quote] = sub;
        const name = sub.replace(/^["'`]/, "").replace(/["'`]$/, "");

        return `${quote}${decodeURIComponent(new URL(name, new URL(path, location.href)).href).replace(new RegExp(quote, "g"), `\\${quote}`)}${quote}`
    }).replace(/export[\r\n\t ]+default/g, ()=>{
        return "return";
    }) ?? "";

    return {
        template: templateComponent?.innerHTML ?? "",
        ...await new AsyncFunction(js)() ?? {}
    };
}