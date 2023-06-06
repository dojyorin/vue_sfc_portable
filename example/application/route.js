import {createRouter, createWebHashHistory} from "vue-router";
import {asyncComponent} from "../deps.js";

export const route = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path : "/",
        component: asyncComponent("./application/page/home.vue")
    }, {
        path : "/sub",
        component: asyncComponent("./application/page/sub.vue")
    }, {
        path : "/:catchAll(.*)",
        component: asyncComponent("./application/page/404.vue")
    }]
});