/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

export function resolvePath(base:string, ...paths:string[]){
    return decodeURIComponent(paths.reduce((a, b) => new URL(b, a).href, base));
}