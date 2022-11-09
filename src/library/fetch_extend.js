/**
* @typedef {string | number | boolean | null | JsonArray | JsonObject} JsonStruct
* @typedef {JsonStruct[]} JsonArray
* @typedef {{[key: string]: JsonStruct}} JsonObject
**/

/**
* @typedef {Exclude<HeadersInit, Headers> | URLSearchParams} QueryInit
* @typedef {Omit<RequestInit, "window"> & {query?: QueryInit}} FetchInit
**/

/**
* @typedef {object} FetchResponseType
* @property {string} text
* @property {JsonStruct} json
* @property {FormData} form
* @property {Uint8Array} byte
* @property {ArrayBuffer} buffer
* @property {Blob} blob
* @property {boolean} ok
* @property {Response} response
**/

/**
* @template {keyof FetchResponseType} T
* @param {string} path
* @param {T} type
* @param {FetchInit} [option]
* @return {Promise<FetchResponseType[T]>}
**/
export async function fetchExtend(path, type, option){
    const {origin, pathname} = /^http(s|):\/\//i.test(path) ? new URL(path) : new URL(path, location.href);
    const query = new URLSearchParams(option?.query).toString();

    const response = await fetch(`${origin}${pathname}${query && "?"}${query}`, {
        method: option?.method ?? "GET",
        credentials: option?.credentials ?? "omit",
        mode: option?.mode ?? "cors",
        cache: option?.cache ?? "no-cache",
        redirect: option?.redirect ?? "follow",
        keepalive: option?.keepalive ?? false,
        referrerPolicy: option?.referrerPolicy ?? "no-referrer",
        referrer: option?.referrer ?? "",
        integrity: option?.integrity ?? "",
        signal: option?.signal ?? null,
        headers: option?.headers ?? {},
        body: option?.body ?? null,
        window: null
    });

    switch(type){
        case "text": return await response.text();
        case "json": return await response.json();
        case "form": return await response.formData();
        case "byte": return new Uint8Array(await response.arrayBuffer());
        case "buffer": return await response.arrayBuffer();
        case "blob": return await response.blob();
        case "ok": return response.ok;
        case "response": return response;
        default: throw new Error();
    }
}