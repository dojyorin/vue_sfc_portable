import {createRouter, createWebHashHistory, fetchAsyncComponent} from "../deps.js";

export const route = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path : "/",
        component: fetchAsyncComponent("./application/page/home.vue")
    }, {
        path : "/sub",
        component: fetchAsyncComponent("./application/page/sub.vue")
    }, {
        path : "/:catchAll(.*)",
        component: fetchAsyncComponent("./application/page/404.vue")
    }]
});