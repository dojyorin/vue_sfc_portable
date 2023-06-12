<template>
    <v-app-bar density="compact" color="primary">
        <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>

        <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
</template>

<script>
    import {defineComponent, computed} from "../../deps.js";

    export default defineComponent({
        props: ["nav"],
        emits: ["update:nav"],
        setup(props, context){
            const nav = computed({
                get: () => props.nav,
                set: v => context.emit("update:nav", v)
            });

            return {nav};
        }
    });
</script>