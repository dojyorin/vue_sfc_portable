/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type FetchInit, type Component, fetchExtend, randomUuid, defineAsyncComponent} from "../deps.ts";

export async function fetchComponent(path:string, option?:FetchInit):Promise<Component>{
    const {head} = new DOMParser().parseFromString(await fetchExtend(path, "text", option), "text/html");
    const elements = [...head.children];

    const template = <HTMLTemplateElement | undefined>elements.find(({tagName}) => tagName === "TEMPLATE");
    const script = <HTMLScriptElement | undefined>elements.find(({tagName}) => tagName === "SCRIPT");
    const style = <HTMLStyleElement | undefined>elements.find(({tagName}) => tagName === "STYLE");

    if(style){
        const css = document.createElement("style");

        if(style.hasAttribute("scoped")){
            const scope = `style-${randomUuid()}`;

            for(const {attributes} of template?.content?.querySelectorAll("[class]") ?? []){
                attributes.setNamedItem(document.createAttribute(scope));
            }

            for(const rule of style?.sheet?.cssRules ?? []){
                if(rule instanceof CSSStyleRule){
                    rule.selectorText = `${rule.selectorText}[${scope}]`;
                }
            }
        }

        for(const {cssText} of style?.sheet?.cssRules ?? []){
            css.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(css);
    }

    const js = script?.innerHTML?.replace(/export +default/, "return");

    return {
        template: template?.innerHTML ?? "",
        ...js ? await (async()=>{}).constructor(js)() : {}
    };
}

export function asyncComponent(path:string){
    return defineAsyncComponent(() => fetchComponent(path));
}