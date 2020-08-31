(()=>{
    async function httpGet(path){
        const options = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credential: "omit",
            referrerPolicy: "no-referrer",
            redirect: "follow",
            keepalive: false,
            referrer: "",
            integrity: "",
            headers: {},
            body: null
        };

        return (await fetch(path, options)).text();
    }

    function getComponent(doc, tag){
        const block = new RegExp(`<${tag}.*?>.*</${tag}>`, "igs");

        return doc.trim().match(block)?.[0]?.trim() ?? "";
    }

    function getContent(doc, tag){
        const start = new RegExp(`^<${tag}.*?>`, "is");
        const end = new RegExp(`</${tag}>$`, "is");

        return doc.trim().replace(start, "").replace(end, "").trim();
    }

    function returnExport(script){
        return new Function(script.trim().replace(/^\s*?export\s+?default/i, "return"))() || {};
    }

    async function loadComponent(path){
        const response = await httpGet(path);

        const template = getComponent(response, "template");
        const templateBody = getContent(template, "template");

        const script = getComponent(response, "script");
        const scriptBody = getContent(script, "script");

        const style = getComponent(response, "style");
        const styleBody = getContent(style, "style");

        let templateScoped = "";
        let styleScoped = "";

        const isScoped = /^<style\s.*?scoped/i.test(style);

        if(isScoped){
            const random = crypto.getRandomValues(new Uint8Array(4));
            const scope = `data-v-${Array.from(random).map(byte => byte.toString(16)).join("")}`;

            const selectors = Array.from(new Set(styleBody.match(/\.[a-zA-Z_][a-zA-Z0-9_\-]*/ig)));

            templateScoped = template.replace(/<[a-zA-Z0-9_\-]+?\s.*?class=".*?"/ig, `$& ${scope}`);
            styleScoped = selectors.reduce((temp, selector) => temp.replace(new RegExp(selector, "ig"), `${selector}[${scope}]`), styleBody);
        }

        const css = document.createElement("style");
        css.innerText = styleScoped || styleBody;
        document.head.appendChild(css);

        return {
            template: templateScoped || templateBody,
            mixins: [returnExport(scriptBody) || {}]
        };
    }

    Object.defineProperty(globalThis, "VueLoader", {
        writable: false,
        configurable: false,
        enumerable: false,
        value: Object.freeze({
            version: "0.1.0",
            loadComponent
        })
    });
})();