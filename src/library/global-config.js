Object.defineProperty(globalThis, "$CONFIG", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: $deepSeal(await $fetch("./config.json"))
});