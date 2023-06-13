/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, type FetchInit, fetchExtend} from "../deps.ts";
import {compileComponent} from "./compile.ts";

export function fetchComponent(path:string, option?:FetchInit):() => Promise<Component>{
    return async () => await compileComponent(await fetchExtend(path, "text", option), path);
}