/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type FetchInit, type Component, fetchExtend, randomUuid, trimExtend} from "../deps.ts";

const AsyncFunction = <FunctionConstructor>(async function(){}).constructor;

export async function fetchComponent(path:string, option?:FetchInit):Promise<Component>{
    const {head: {children: [...elements]}} = new DOMParser().parseFromString(await fetchExtend(path, "text", option), "text/html");

    const template = <HTMLTemplateElement | undefined>elements.find(e => e instanceof HTMLTemplateElement);
    const script = <HTMLScriptElement | undefined>elements.find(e => e instanceof HTMLScriptElement);
    const style = <HTMLStyleElement | undefined>elements.find(e => e instanceof HTMLStyleElement);

    if(style){
        const tag = document.createElement("style");

        if(style.hasAttribute("scoped")){
            const scope = `data-v-${randomUuid().split(/-/)[0]}`;

            for(const {attributes} of template?.content.querySelectorAll("[class]") ?? []){
                attributes.setNamedItem(document.createAttribute(scope));
            }

            for(const rule of style.sheet?.cssRules ?? []){
                if(!(rule instanceof CSSStyleRule)){
                    continue;
                }

                rule.selectorText = `${rule.selectorText}[${scope}]`;
            }
        }

        for(const {cssText} of style.sheet?.cssRules ?? []){
            tag.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(tag);
    }

    const js = script?.innerHTML.replace(/import[^;]+from[^;]+;/gs, (match)=>{
        const source = trimExtend(match.replace(/[\n\t]/g, " "));

        const [, name, _path] = source.match(/import(.+?)from *["'](.+?)["']/)?.map(v => v.trim()) ?? [];
        const json = /assert{type:["']json["']};$/.test(source.replace(/ /g, ""));
        const npm = !/^\.{0,2}\/|^https{0,1}:\/\//i.test(_path); // URL post process external.

        const n = (()=>{
            if(/^\*/.test(name)){
                return name.match(/as ([a-zA-Z_$][a-zA-Z0-9_$]+)/)?.[1] ?? "";
            }
            else if(/^[a-zA-Z_$]/.test(name)){
                return `{default:${name.match(/^([a-zA-Z_$][a-zA-Z0-9_$]+)/)?.[1] ?? ""}}`;
            }
            else if(/^{/.test(name)){
                return `{${name.match(/{(.+?)}/)?.[1].replace(/ as /, ":") ?? ""}}`;
            }
            else{
                return "";
            }
        })();

        return `const ${n} = await import('${npm ? _path : new URL(_path, new URL(path, location.href))}'${json ? ", {assert: {type: 'json'}}" : ""});`;
    }).replace(/export[\r\n\t ]+default/, "return");
js.replace(/"\.{0,2}\/[^"]+"|''/g, (match)=>{
    const _p = match.replace(/^["'`]/, "").replace(/["'`]$/, "");

    return new URL(_p, new URL(path, location.href)).href;
});
    return {
        template: template?.innerHTML ?? "",
        ...js ? await new AsyncFunction(js)() : {}
    };
}