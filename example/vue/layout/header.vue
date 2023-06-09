<template>
    <v-app-bar density="compact" color="primary">
        <template #prepend>
            <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
</template>

<script>
    import {computed} from "../../deps.js";

    export default {
        props: ["nav"],
        emits: ["update:nav"],
        setup(props, context){
            const nav = computed({
                get: () => props.nav,
                set: v => context.emit("update:nav", v)
            });

            return {nav};
        }
    };
</script>