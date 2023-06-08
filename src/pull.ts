/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, type FetchInit, fetchExtend} from "../deps.ts";
import {importComponent, exportComponent} from "./io.ts";
import {convertJS, convertCSS, convertPath} from "./convert.ts";

type LazyComponent = () => Promise<Component>;

export function fetchComponent(path:string, option?:FetchInit):LazyComponent{
    return async()=>{
        const {template, script, style} = importComponent(await fetchExtend(path, "text", option));

        if(script){
            convertJS(script);
            convertPath(script, path);
        }

        if(style){
            convertCSS(template, style);
        }

        return exportComponent({template, script, style});
    };
}