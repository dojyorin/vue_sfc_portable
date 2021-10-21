<template>
<v-app>
    <vue-loading></vue-loading>
    <vue-notify></vue-notify>

    <vue-header></vue-header>
    <vue-drawer></vue-drawer>

    <v-main>
        <router-view></router-view>
    </v-main>

    <vue-footer></vue-footer>
</v-app>
</template>

<script>
export default {
    components: {
        "vue-header": () => $vueLoader("./application/layouts/header.vue"),
        "vue-footer": () => $vueLoader("./application/layouts/footer.vue"),
        "vue-drawer": () => $vueLoader("./application/layouts/drawer.vue"),
        "vue-loading": () => $vueLoader("./application/layouts/loading.vue"),
        "vue-notify": () => $vueLoader("./application/layouts/notify.vue")
    }
};
</script>