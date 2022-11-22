import {fetchExtend} from "./utility/simple_utility.min.js";

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
    const component = await fetchExtend(path, "text");
    const dom = [...new DOMParser().parseFromString(component, "text/html").head.children];

    /** @type {?HTMLTemplateElement} */
    const template = dom.find(({tagName}) => tagName === "TEMPLATE");

    /** @type {?HTMLScriptElement} */
    const script = dom.find(({tagName}) => tagName === "SCRIPT");

    /** @type {?HTMLStyleElement} */
    const style = dom.find(({tagName}) => tagName === "STYLE");

    if(style){
        const css = document.createElement("style");

        if(style.hasAttribute("scoped")){
            const scope = `scope-${crypto.randomUUID()}`;

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

    return {
        template: template?.innerHTML ?? "",
        extends: await new (async function(){}).constructor(script?.innerHTML?.replace(/export +default/, "return") ?? "")() || {}
    };
}