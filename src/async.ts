/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>

import {type Component, type FetchInit, fetchExtend} from "../deps.ts";
import {parseComponent} from "./parse.ts";

type LazyComponent = () => Promise<Component>;

export function fetchComponent(path:string, option?:FetchInit):LazyComponent{
    return async () => parseComponent(await fetchExtend(path, "text", option));
}