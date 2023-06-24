/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

export function parseHtml(html:string){
    return new DOMParser().parseFromString(html, "text/html");
}

export function findComponent<T extends typeof HTMLElement>(elements:Element[], type:T){
    return <InstanceType<T> | undefined>elements.find(e => e instanceof type);
}