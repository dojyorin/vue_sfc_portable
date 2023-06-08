/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component} from "../deps.ts";

interface SFCPart{
    template: HTMLTemplateElement;
    script?: HTMLScriptElement;
    style?: HTMLStyleElement;
}

const AsyncFunction = <FunctionConstructor>(async function(){}).constructor;

export function importComponent(sfc:string):SFCPart{
    const {head: {children: [...elements]}} = new DOMParser().parseFromString(sfc, "text/html");

    const template = <HTMLTemplateElement | undefined>elements.find(e => e instanceof HTMLTemplateElement);
    const script = <HTMLScriptElement | undefined>elements.find(e => e instanceof HTMLScriptElement);
    const style = <HTMLStyleElement | undefined>elements.find(e => e instanceof HTMLStyleElement);

    if(!template){
        throw new Error();
    }

    return {template, script, style};
}

export async function exportComponent({template, script, style}:SFCPart):Promise<Component>{
    if(style?.sheet?.cssRules){
        const element = document.createElement("style");

        for(const {cssText} of style.sheet.cssRules){
            element.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(element);
    }

    return {
        template: template.innerHTML,
        ...await new AsyncFunction(script?.innerHTML ?? "")() ?? {}
    };
}