/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

import {minifyScript, base64Encode, utfEncode} from "../deps.ts";

export async function esmEval<T extends unknown>(js:string){
    const {code} = await minifyScript(js);
    const b64 = base64Encode(utfEncode(code ?? ""));

    return <Record<string, T>>await import(`data:text/javascript;base64,${b64}`);
}