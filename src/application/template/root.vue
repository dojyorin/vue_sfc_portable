<template>
    <v-app>
        <ct-notify></ct-notify>
        <ct-loading></ct-loading>
        <ct-nav></ct-nav>
        <ct-header></ct-header>
        <ct-page></ct-page>
        <ct-footer></ct-footer>
    </v-app>
</template>

<script>
    const {loadComponent} = await import("./core.js");

    export default {
        components: {
            "ct-notify": () => loadComponent("./application/template/notify.vue"),
            "ct-loading": () => loadComponent("./application/template/loading.vue"),
            "ct-nav": () => loadComponent("./application/template/nav.vue"),
            "ct-header": () => loadComponent("./application/template/header.vue"),
            "ct-page": () => loadComponent("./application/template/page.vue"),
            "ct-footer": () => loadComponent("./application/template/footer.vue")
        }
    };
</script>