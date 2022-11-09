import {fetchExtend} from "./fetch_extend.js";

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

    /** @type {HTMLTemplateElement} */
    const template = dom.find(({tagName}) => tagName === "TEMPLATE");

    /** @type {HTMLScriptElement} */
    const script = dom.find(({tagName}) => tagName === "SCRIPT");

    /** @type {HTMLStyleElement} */
    const style = dom.find(({tagName}) => tagName === "STYLE");

    if(style?.hasAttribute("scoped")){
        const scope = `data-v-${Math.floor(Math.random() * 0x01000000).toString(16).padStart(6, "0")}`;

        for(const {attributes} of template.content.querySelectorAll("[class]")){
            attributes.setNamedItem(document.createAttribute(scope));
        }

        /** @type {CSSStyleRule} */
        for(const rule of style.sheet.cssRules){
            rule.selectorText = `${rule.selectorText}[${scope}]`;
        }
    }

    if(style){
        const css = document.createElement("style");

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