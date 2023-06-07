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
    import {defineComponent, defineAsyncComponent, fetchAsyncComponent} from "../../deps.js";

    export default defineComponent({
        components: {
            // "ct-notify": defineAsyncComponent(fetchAsyncComponent("./notify.vue")),
            // "ct-loading": defineAsyncComponent(fetchAsyncComponent("./loading.vue")),
            // "ct-nav": defineAsyncComponent(fetchAsyncComponent("./nav.vue")),
            "ct-header": defineAsyncComponent(fetchAsyncComponent("./header.vue")),
            "ct-page": defineAsyncComponent(fetchAsyncComponent("./page.vue")),
            "ct-footer": defineAsyncComponent(fetchAsyncComponent("./footer.vue"))
        }
    });
</script>