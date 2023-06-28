import {fetchComponent} from "../deps.js";

export const component = ((arg)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(arg)){
                context.component(k, v);
            }
        }
    };
})({
    "x-reflect": await fetchComponent(import.meta.resolve("./component/reflect.vue"))()
});