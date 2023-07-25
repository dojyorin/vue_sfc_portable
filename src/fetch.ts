/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {type Component, type FetchInit, fetchExtend} from "../deps.ts";
import {compileComponent} from "./compile.ts";

/**
* Wrap component in function.
*/
export type ComponentWrapFunction = () => Promise<Component>;

/**
* Download and compile SFC on network using Fetch API.
* @example
* ```ts
* // in Root
* const vue = createApp(await fetchComponent("./main.vue")());
*
* // in SFC
* export default defineComponent({
*     components: {
*         "my-button": defineAsyncComponent(fetchComponent("./button.vue"))
*     }
* });
* ```
*/
export function fetchComponent(path:string, option?:FetchInit):ComponentWrapFunction{
    return async () => await compileComponent(await fetchExtend(path, "text", option), path);
}