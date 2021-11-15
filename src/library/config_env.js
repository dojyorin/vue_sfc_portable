Object.defineProperty(globalThis, "$ENV", {
    enumerable: false,
    configurable: false,
    writable: false,
    get value(){
        return {
            PATH_AP: "./application"
        };
    }
});