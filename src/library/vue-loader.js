Object.defineProperty(globalThis, "$vueLoader", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(path){
        const response = await $fetchExtend(path, {
            type: "text"
        });

        const dom = [...new DOMParser().parseFromString(`<html><body>${response}</body></html>`, "text/html").body.children];
        const template = dom.find(({tagName}) => tagName === "TEMPLATE");
        const script = dom.find(({tagName}) => tagName === "SCRIPT");
        const style = dom.find(({tagName}) => tagName === "STYLE");

        if(style?.hasAttribute("scoped")){
            const scope = `data-v-${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0")}`;

            for(const {attributes} of template.content.querySelectorAll("[class]")){
                attributes.setNamedItem(document.createAttribute(scope));
            }

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
});