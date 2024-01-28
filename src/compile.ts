import {type Component, minify, b64DataURL, u8Encode, pad0} from "../deps.ts";

function findComponent<T extends typeof HTMLElement>(elements:Element[], type:T){
    return <InstanceType<T> | undefined>elements.find(e => e instanceof type);
}

/**
* Contents of SFC parts.
*/
export interface SFCPart{
    template: string;
    script?: string;
    style?: string;
}

/**
* SFC parts `<template>` `<script>` `<style>` to decompose and string processing such as relative path fix and CSS scoping.
* @example
* ```ts
* const part = parseComponent("<template>...</template>", "./component.vue");
* ```
*/
export function parseComponent(sfc:string, path?:string):SFCPart{
    const {head: {children: [...elements]}} = new DOMParser().parseFromString(sfc, "text/html");

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
        const scope = `data-v-${pad0(Math.floor(Math.random() * 16777216), 6, 16)}`;

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
        script: script?.innerHTML,
        style: style?.innerHTML
    };
}

/**
* Generate component object can be used in Vue from SFC parts.
* @example
* ```ts
* const part = parseComponent("<template>...</template>", "./component.vue");
* const component = await generateComponent(part);
* ```
*/
export async function generateComponent({template, script, style}:SFCPart):Promise<Component>{
    if(style){
        const css = document.createElement("style");
        css.innerHTML = style;
        document.head.appendChild(css);
    }

    const {code} = await minify(script ?? "");
    const {default: component} = <{default: Component}>await import(b64DataURL(u8Encode(code ?? ""), "text/javascript"));

    return {
        template: template,
        ...component
    };
}

/**
* Compile from SFC to component.
* @example
* ```ts
* const component = await compileComponent("<template>...</template>", "./component.vue");
* ```
*/
export async function compileComponent(sfc:string, path?:string):Promise<Component>{
    return await generateComponent(parseComponent(sfc, path));
}