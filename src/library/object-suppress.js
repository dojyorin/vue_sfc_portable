Object.defineProperty(globalThis, "$deepFreeze", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(o){
        Object.freeze(o);

        for(const k of Object.keys(o)){
            if(!Object.isFrozen(o[k]) && o.hasOwnProperty(k) && typeof o[k] === "object" && o[k] !== null){
                $deepFreeze(o[k]);
            }
        }

        return o;
    }
});

Object.defineProperty(globalThis, "$deepSeal", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(o){
        Object.seal(o);

        for(const k of Object.keys(o)){
            if(!Object.isSealed(o[k]) && o.hasOwnProperty(k) && typeof o[k] === "object" && o[k] !== null){
                $deepSeal(o[k]);
            }
        }

        return o;
    }
});