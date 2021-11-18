Object.defineProperty(globalThis, "$fetch", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(url, option){
        return (await fetch(Object.entries(option?.params ?? {}).reduce((u, [k, v])=>{
            u.searchParams.append(k, v);
            return u;
        }, new URL(url, /^http(s|):\/\//i.test(url) ? undefined : location.href)), {
            headers: Object.entries(option?.headers ?? {}).reduce((h, [k, v])=>{
                h.append(k, v);
                return h;
            }, new Headers()),
            method: option?.method ?? "get",
            credentials: option?.credentials ?? "omit",
            body: option?.body ?? null,
            mode: option?.mode ?? "cors",
            cache: option?.cache ?? "no-cache",
            referrerPolicy: option?.referrerPolicy ?? "no-referrer",
            referrer: option?.referrer ?? "",
            redirect: option?.redirect ?? "follow",
            keepalive: option?.keepalive ?? false,
            integrity: option?.integrity ?? "",
            signal: option?.signal ?? null,
            window: null
        }))[option?.type ?? "json"]();
    }
});