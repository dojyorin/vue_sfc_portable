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
    "x-notify": await fetchComponent(import.meta.resolve("./component/notify.vue"))()
});