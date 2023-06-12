<template>
    <v-navigation-drawer floating temporary v-model="model">
        <v-toolbar density="compact" color="primary">
            <v-btn icon="mdi-close" @click="model = false"></v-btn>
        </v-toolbar>

        <template v-for="{path, name} in routes">
            <v-list-item :to="path">
                <v-list-item-title>{{name}}</v-list-item-title>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
    import {computed, useRouter} from "../../deps.js";

    export default {
        props: ["modelValue"],
        emits: ["update:modelValue"],
        setup(props, context){
            const router = useRouter();

            const model = computed({
                get: () => props.modelValue,
                set: v => context.emit("update:modelValue", v)
            });

            const routes = router.getRoutes().toSpliced(-1, 1);

            return {model, routes};
        }
    };
</script>