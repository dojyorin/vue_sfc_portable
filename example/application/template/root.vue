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
    const {defineComponent, defineAsyncComponent} = await import("vue");
    const {asyncComponent} = await import("./deps.js");

    export default defineComponent({
        components: {
            // "ct-notify": defineAsyncComponent(asyncComponent("./application/template/notify.vue")),
            // "ct-loading": defineAsyncComponent(asyncComponent("./application/template/loading.vue")),
            // "ct-nav": defineAsyncComponent(asyncComponent("./application/template/nav.vue")),
            "ct-header": defineAsyncComponent(asyncComponent("./application/template/header.vue")),
            "ct-page": defineAsyncComponent(asyncComponent("./application/template/page.vue")),
            "ct-footer": defineAsyncComponent(asyncComponent("./application/template/footer.vue"))
        }
    });
</script>