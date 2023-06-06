/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>

import {type FetchInit} from "../deps.ts";
import {fetchComponent} from "./fetch.ts";

export function fetchAsyncComponent(path:string, option?:FetchInit){
    return () => fetchComponent(path, option);
}