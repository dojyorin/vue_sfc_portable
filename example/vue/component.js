import {fetchComponent} from "../deps.js";

export const component = ((components)=>{
    return {
        install(vue){
            for(const [k, v] of Object.entries(components)){
                vue.component(k, v);
            }
        }
    };
})({
    "x-reflect": await fetchComponent(import.meta.resolve("./component/reflect.vue"))()
});