# **Vue SFC Portable**
![actions:release](https://github.com/dojyorin/vue_sfc_portable/actions/workflows/release.yaml/badge.svg)
![shields:license](https://img.shields.io/github/license/dojyorin/vue_sfc_portable)
![shields:release](https://img.shields.io/github/release/dojyorin/vue_sfc_portable)

Minimal Vue SFC compiler for browser.

# Details
Provide minimal features for compiling SFC in browser.

Compatible features with [@vue/compiler-sfc](https://www.npmjs.com/package/@vue/compiler-sfc):

- Pure HTML/JS/CSS
- `<style scoped>` *1

Incompatible features:

- `lang` attribute (Pug, TypeScript, SCSS, ...)
- `src` attribute
- `<script setup>`
- `<style module>`
- `<style>` multiple tag

*1 Support only class selectors.

# Usage
```ts
export {fetchComponent} from "https://esm.sh/gh/dojyorin/vue_sfc_portable@version/mod.ts?bundle&target=esnext";
```

# API
See [`mod.ts`](./mod.ts) for details.