/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type FetchInit, defineAsyncComponent} from "./deps.ts";
import {fetchComponent} from "./component.ts";

export function fetchAsyncComponent(path:string, option?:FetchInit){
    return defineAsyncComponent(() => fetchComponent(path, option));
}