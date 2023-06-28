import {ref, reactive} from "../deps.js";

export const provide = ((arg)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(arg)){
                context.provide(k, v);
            }
        }
    };
})({
    "navigation": ref(false),
    "loading": ref(false),
    "notifies": reactive([])
});