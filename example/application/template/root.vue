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
    import {defineComponent, defineAsyncComponent, fetchAsyncComponent} from "./deps.js";

    export default defineComponent({
        components: {
            // "ct-notify": defineAsyncComponent(fetchAsyncComponent("./application/template/notify.vue")),
            // "ct-loading": defineAsyncComponent(fetchAsyncComponent("./application/template/loading.vue")),
            // "ct-nav": defineAsyncComponent(fetchAsyncComponent("./application/template/nav.vue")),
            "ct-header": defineAsyncComponent(fetchAsyncComponent("./application/template/header.vue")),
            "ct-page": defineAsyncComponent(fetchAsyncComponent("./application/template/page.vue")),
            "ct-footer": defineAsyncComponent(fetchAsyncComponent("./application/template/footer.vue"))
        }
    });
</script>