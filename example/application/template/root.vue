<template>
    <v-app>
        <!-- <ct-notify></ct-notify> -->
        <!-- <ct-loading></ct-loading> -->
        <!-- <ct-nav></ct-nav> -->
        <ct-header></ct-header>
        <ct-page></ct-page>
        <ct-footer></ct-footer>
    </v-app>
</template>

<script>
    const {defineComponent} = await import("vue");
    const {fetchAsyncComponent} = await import("./deps.js");

    export default defineComponent({
        components: {
            // "ct-notify": () => loadComponent("./application/template/notify.vue"),
            // "ct-loading": () => loadComponent("./application/template/loading.vue"),
            // "ct-nav": () => loadComponent("./application/template/nav.vue"),
            "ct-header": fetchAsyncComponent("./application/template/header.vue"),
            "ct-page": fetchAsyncComponent("./application/template/page.vue"),
            "ct-footer": fetchAsyncComponent("./application/template/footer.vue")
        }
    });
</script>