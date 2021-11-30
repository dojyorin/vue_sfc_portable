Object.defineProperty(globalThis, "$fetch", {
    enumerable: false,
    configurable: false,
    writable: false,
    async value(path, option){
        return (await fetch(Object.entries(option?.params ?? {}).reduce((url, [key, value])=>{
            url.searchParams.append(key, value);
            return url;
        }, new URL(path, /^http(s|):\/\//i.test(path) ? undefined : location.href)), {
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
        }))[option?.type ?? "json"]();
    }
});