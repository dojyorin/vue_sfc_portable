<template>
<v-app>
    <vue-header :color="color" :drawer.sync="drawer"></vue-header>
    <vue-drawer :color="color" v-model="drawer"></vue-drawer>

    <template v-for="notify in $store.getters.getNotifies">
        <vue-notify :color="notify.color" :key="notify.token">{{notify.message}}</vue-notify>
    </template>

    <v-main>
        <router-view></router-view>
    </v-main>

    <vue-footer :color="color"></vue-footer>
</v-app>
</template>

<script>
export default {
    components: {
        "vue-header": () => $vueLoader("./application/layouts/header.vue"),
        "vue-footer": () => $vueLoader("./application/layouts/footer.vue"),
        "vue-drawer": () => $vueLoader("./application/layouts/drawer.vue"),
        "vue-notify": () => $vueLoader("./application/components/notify.vue")
    },

    data(){
        return {
            color: "blue",
            drawer: false
        };
    }
};
</script>