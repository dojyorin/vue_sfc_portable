/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, type FetchInit, fetchExtend} from "../deps.ts";
import {importComponent, exportComponent} from "./interface.ts";
import {importDynamic, exportReturn, relativePath, scopedStyle} from "./transpile.ts";

type LazyComponent = () => Promise<Component>;

export function fetchComponent(path:string, option?:FetchInit):LazyComponent{
    return async()=>{
        const {template, script, style} = importComponent(await fetchExtend(path, "text", option));

        if(script){
            importDynamic(script);
            exportReturn(script);
            relativePath(script, path);
        }

        if(style){
            scopedStyle(template, style);
        }

        return exportComponent({template, script, style});
    };
}