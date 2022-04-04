export default {
    routes: [{
        path: "*",
        component: () => $vueLoader("./application/page/404.vue")
    }, {
        path: "/",
        component: () => $vueLoader("./application/page/index.vue")
    }, {
        path: "/sub",
        component: () => $vueLoader("./application/page/sub.vue")
    }, {
        path: "/worker",
        component: () => $vueLoader("./application/page/worker.vue")
    }]
};