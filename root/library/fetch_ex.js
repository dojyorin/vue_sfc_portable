Object.defineProperty(globalThis, "$fetchEx", {
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
            mode: option?.mode ?? "cors",
            cache: option?.cache ?? "no-cache",
            credentials: option?.credentials ?? "omit",
            referrerPolicy: option?.referrerPolicy ?? "no-referrer",
            referrer: option?.referrer ?? "",
            redirect: option?.redirect ?? "follow",
            keepalive: option?.keepalive ?? false,
            integrity: option?.integrity ?? "",
            signal: option?.signal ?? null,
            window: null,
            body: option?.body ?? null
        }))[option?.type ?? "json"]();
    }
});