<template>
    <v-app>
        <v-overlay persistent no-click-animation z-index="3000" class="justify-center align-center" v-model="loading">
            <v-progress-circular indeterminate size="60" width="4" color="primary"></v-progress-circular>
        </v-overlay>

        <template v-for="({color, message}, i) in notifies">
            <v-snackbar model-value position="fixed" location="top" timeout="-1" :color="color">
                <span>{{message}}</span>

                <template #actions>
                    <v-btn ripple density="comfortable" icon="mdi-close" @click="notifies.splice(i, 1)"></v-btn>
                </template>
            </v-snackbar>
        </template>

        <x-navigation v-model="nav"></x-navigation>

        <x-header v-model:nav="nav"></x-header>

        <v-main>
            <router-view></router-view>
        </v-main>

        <x-footer></x-footer>
    </v-app>
</template>

<script>
    import {defineComponent, defineAsyncComponent, ref, inject, onMounted, fetchComponent} from "../deps.js";

    export default defineComponent({
        components: {
            "x-header": defineAsyncComponent(fetchComponent("./layout/header.vue")),
            "x-footer": defineAsyncComponent(fetchComponent("./layout/footer.vue")),
            "x-navigation": defineAsyncComponent(fetchComponent("./layout/navigation.vue"))
        },
        setup(){
            const nav = ref(false);

            const loading = inject("loading");
            const notifies = inject("notifies");

            onMounted(()=>{
                loading.value = false;
            });

            return {nav, loading, notifies};
        }
    });
</script>