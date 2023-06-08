/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {randomUuid, trimExtend} from "../deps.ts";

function replaceScript(script:HTMLScriptElement, match:RegExp, method:Parameters<typeof String.prototype.replace>[1]){
    script.innerHTML = script.innerHTML.replace(match, method);
}

export function convertJS(script:HTMLScriptElement){
    replaceScript(script, /import[^;]+from[^;]+;/g, (sub)=>{
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
    });

    replaceScript(script, /export[\r\n\t ]+default/g, ()=>{
        return "return";
    });
}

export function convertCSS(template:HTMLTemplateElement, style:HTMLStyleElement){
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
}

export function convertPath(script:HTMLScriptElement, path:string){
    replaceScript(script, /"\.{0,2}\/(\\"|[^"\r\n\t ])+"|'\.{0,2}\/(\\'|[^'\r\n\t ])+'|`\.{0,2}\/(\\`|[^`\r\n\t ])+`/g, (sub)=>{
        const [quote] = sub;
        const name = sub.replace(/^["'`]/, "").replace(/["'`]$/, "");

        return `${quote}${decodeURIComponent(new URL(name, new URL(path, location.href)).href).replace(new RegExp(quote, "g"), `\\${quote}`)}${quote}`;
    });
}