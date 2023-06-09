<template>
    <v-navigation-drawer floating temporary v-model="nav">
        <template #prepend>
            <v-toolbar density="compact" color="primary">
                <v-btn icon="mdi-close" @click="nav = false"></v-btn>
            </v-toolbar>
        </template>

        <v-list>
            <v-list-item to="/">
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item to="/sub">
                <v-list-item-title>Sub</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
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