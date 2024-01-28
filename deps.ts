/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="dom"/>
/// <reference lib="dom.iterable"/>

// @deno-types="npm:vue@3.4.15/dist/vue.d.ts"
export {type Component} from "https://esm.sh/vue@3.4.15?bundle&target=esnext";

// @deno-types="npm:terser@5.27.0/tools/terser.d.ts"
export {minify} from "https://esm.sh/terser@5.27.0?bundle&target=esnext";

// @deno-types="https://deno.land/x/simple_utility@v2.0.0/mod.ts"
export {type FetchInit, fetchExtend, b64DataURL, u8Encode, pad0} from "https://esm.sh/gh/dojyorin/deno_simple_utility@v2.0.0/mod.pure.ts?bundle&target=esnext";