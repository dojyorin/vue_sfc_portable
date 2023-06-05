import {fetchExtend, cryptoUuid} from "./module/deno_simple_utility.mod.universal.min.js";

/**
* @typedef {object} VueComponent
* @property {string} template
* @property {Record<string, unknown>} extends
*/

/**
* @param {string} path
* @return {Promise<VueComponent>}
*/
export async function loadComponent(path){
    const {head} = new DOMParser().parseFromString(await fetchExtend(path, "text"), "text/html");
    const elements = [...head.children];

    /** @type {?HTMLTemplateElement} */
    const template = elements.find(({tagName}) => tagName === "TEMPLATE");

    /** @type {?HTMLScriptElement} */
    const script = elements.find(({tagName}) => tagName === "SCRIPT");

    /** @type {?HTMLStyleElement} */
    const style = elements.find(({tagName}) => tagName === "STYLE");

    if(style){
        const css = document.createElement("style");

        if(style.hasAttribute("scoped")){
            const scope = `style-${cryptoUuid()}`;

            for(const {attributes} of template.content.querySelectorAll("[class]")){
                attributes.setNamedItem(document.createAttribute(scope));
            }

            for(const rule of style.sheet.cssRules){
                if(rule instanceof CSSStyleRule){
                    rule.selectorText = `${rule.selectorText}[${scope}]`;
                }
            }
        }

        for(const {cssText} of style.sheet.cssRules){
            css.innerHTML += `${cssText}\n`;
        }

        document.head.appendChild(css);
    }

    const html = template?.innerHTML;
    const js = script?.innerHTML?.replace(/export +default/, "return");

    return {
        template: html ?? "",
        extends: js ? await new (async()=>{}).constructor(js)() : {}
    };
}