# **Vue SFC Portable**
![actions:release](https://github.com/dojyorin/vue_sfc_portable/actions/workflows/release.yaml/badge.svg)

Minimal Vue SFC compiler for browser.

# Details
Provide minimal features for compiling SFC in browser.

Compatible features with [@vue/compiler-sfc](https://www.npmjs.com/package/@vue/compiler-sfc):

- Pure HTML/JS/CSS
- Scoped CSS

Incompatible features:

- Pug
- TypeScript
- SCSS
- CSS Module
- `src` attribute
- `setup` attribute
- multiple `<style>` tag.

# API
See [`fetch.ts`](./src/fetch.ts) for details.