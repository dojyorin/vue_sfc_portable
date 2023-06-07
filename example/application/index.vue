<template>
    <v-app>
        <v-overlay persistent no-click-animation class="justify-center align-center" v-model="loading">
            <v-progress-circular indeterminate size="60" width="4" color="blue-darken-1"></v-progress-circular>
        </v-overlay>

        <v-navigation-drawer floating temporary v-model="nav">
            <v-toolbar density="compact" color="blue">
                <v-btn icon="mdi-close" @click="nav = false"></v-btn>
            </v-toolbar>
            <x-nav></x-nav>
        </v-navigation-drawer>

        <v-app-bar density="compact" color="blue">
            <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
            <x-header></x-header>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app dark tile padless color="blue">
            <x-footer></x-footer>
        </v-footer>
    </v-app>
</template>

<script>
    import {defineComponent, defineAsyncComponent, fetchAsyncComponent, ref} from "../deps.js";

    export default defineComponent({
        components: {
            "x-nav": defineAsyncComponent(fetchAsyncComponent("./layout/nav.vue")),
            "x-header": defineAsyncComponent(fetchAsyncComponent("./layout/header.vue")),
            "x-footer": defineAsyncComponent(fetchAsyncComponent("./layout/footer.vue"))
        },
        setup(){
            const nav = ref(false);

            return {nav};
        }
    });
</script>