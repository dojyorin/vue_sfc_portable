Object.defineProperty(globalThis, "$fetchExtend", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(path, option){
        const {origin, pathname} = /^https*:\/\//i.test(path) ? new URL(path) : new URL(path, location.href);
        const query = (option?.query instanceof URLSearchParams ? option.query : new URLSearchParams(option?.query instanceof Array ? option.query : Object.entries(option?.query ?? {}))).toString();

        const response = await fetch(`${origin}${pathname.replace(/\/$/, "")}${query && "?"}${query}`, {
            method: option?.method ?? "get",
            credentials: option?.credentials ?? "omit",
            mode: option?.mode ?? "cors",
            cache: option?.cache ?? "no-cache",
            referrerPolicy: option?.referrerPolicy ?? "no-referrer",
            referrer: option?.referrer ?? "",
            redirect: option?.redirect ?? "follow",
            keepalive: option?.keepalive ?? false,
            integrity: "",
            signal: null,
            window: null,
            headers: option?.headers ?? {},
            body: option?.body ?? null
        });

        return option?.type === "response" ? response : response[option?.type ?? "json"]();
    }
});