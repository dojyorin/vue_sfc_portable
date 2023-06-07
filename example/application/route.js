import {createRouter, createWebHashHistory, fetchAsyncComponent} from "../deps.js";

export const route = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path : "/",
        component: fetchAsyncComponent(import.meta.resolve("./page/home.vue"))
    }, {
        path : "/sub",
        component: fetchAsyncComponent(import.meta.resolve("./page/sub.vue"))
    }, {
        path : "/:catchAll(.*)",
        component: fetchAsyncComponent(import.meta.resolve("./page/404.vue"))
    }]
});