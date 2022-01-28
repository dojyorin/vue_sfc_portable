Object.defineProperty(globalThis, "$vueLoader", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(url){
        function getComponent(doc, tag){
            return doc.trim().match(new RegExp(`<${tag}.*?>.*</${tag}>`, "igs"))?.[0]?.trim() ?? "";
        }

        function getContent(doc, tag){
            return doc.trim().replace(new RegExp(`^<${tag}.*?>`, "is"), "").replace(new RegExp(`</${tag}>$`, "i"), "").trim();
        }

        const response = await $fetch(url, {
            type: "text"
        });

        const template = getComponent(response, "template");
        const templateBody = getContent(template, "template");
        const script = getComponent(response, "script");
        const scriptBody = getContent(script, "script");
        const style = getComponent(response, "style");
        const styleBody = getContent(style, "style");

        let scopedTemplate = "";
        let scopedStyle = "";

        if(/^<style .*?scoped/i.test(style)){
            const scope = `data-v-${Array.from(crypto.getRandomValues(new Uint8Array(4))).map(byte => byte.toString(16)).join("")}`;
            scopedTemplate = template.replace(/<[a-zA-Z0-9_\-]+? .*?class=".*?"/ig, `$& ${scope}`);
            scopedStyle = Array.from(new Set(styleBody.match(/\.[a-zA-Z_][a-zA-Z0-9_\-]*/ig))).reduce((temp, selector) => temp.replace(new RegExp(selector, "ig"), `${selector}[${scope}]`), styleBody);
        }

        const css = document.createElement("style");
        css.innerText = scopedStyle || styleBody;
        document.head.appendChild(css);

        return {
            template: scopedTemplate || templateBody,
            extends: new Function(scriptBody.replace(/^ *?export +?default */is, "return"))() || {}
        };
    }
});