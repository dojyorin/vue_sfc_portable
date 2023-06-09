<template>
    <v-app>
        <v-overlay persistent no-click-animation class="justify-center align-center" v-model="loading">
            <v-progress-circular indeterminate size="60" width="4" color="primary"></v-progress-circular>
        </v-overlay>

        <x-navigation v-model="nav"></x-navigation>

        <x-header v-model:nav="nav"></x-header>

        <v-main>
            <router-view></router-view>
        </v-main>

        <x-footer></x-footer>
    </v-app>
</template>

<script>
    import {defineComponent, defineAsyncComponent, useStore, ref, computed, onMounted, fetchComponent} from "../deps.js";

    export default defineComponent({
        components: {
            "x-header": defineAsyncComponent(fetchComponent("./layout/header.vue")),
            "x-footer": defineAsyncComponent(fetchComponent("./layout/footer.vue")),
            "x-navigation": defineAsyncComponent(fetchComponent("./layout/navigation.vue"))
        },
        setup(){
            const store = useStore();

            const loading = computed({
                get: () => store.getters.loading,
                set: v => store.commit("loading", v)
            });

            const nav = ref(false);

            onMounted(()=>{
                store.commit("loading", false);
            });

            return {loading, nav};
        }
    });
</script>