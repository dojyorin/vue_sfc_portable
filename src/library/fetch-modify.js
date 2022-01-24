Object.defineProperty(globalThis, "$fetch", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(path, option){
        const {origin, pathname} = /^https*:\/\//i.test(path) ? new URL(path) : new URL(path, location.href);
        const query = new URLSearchParams(Object.entries(option?.query ?? {})).toString();

        const response = await fetch(`${origin}${pathname === "/" ? "": pathname}${query === "" ? "" : `?${query}`}`.toLowerCase(), {
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

        return option?.type === "raw" ? response : response[option?.type ?? "json"]();
    }
});