<template>
    <v-navigation-drawer floating temporary v-model="model">
        <template #prepend>
            <v-toolbar density="compact" color="primary">
                <v-btn icon="mdi-close" @click="model = false"></v-btn>
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
        props: ["modelValue"],
        emits: ["update:modelValue"],
        setup(props, context){
            const model = computed({
                get: () => props.modelValue,
                set: v => context.emit("update:modelValue", v)
            });

            return {model};
        }
    };
</script>