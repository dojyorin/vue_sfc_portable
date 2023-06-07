import {createRouter, createWebHashHistory, fetchComponent} from "../deps.js";

export const route = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path : "/",
        component: fetchComponent(import.meta.resolve("./page/index.vue"))
    }, {
        path : "/sub",
        component: fetchComponent(import.meta.resolve("./page/sub.vue"))
    }, {
        path : "/:catchAll(.*)",
        component: fetchComponent(import.meta.resolve("./page/404.vue"))
    }]
});