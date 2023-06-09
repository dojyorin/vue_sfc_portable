<template>
    <v-snackbar position="fixed" location="top" :color="color" v-model="enable">
        <slot></slot>

        <template #actions>
            <v-btn ripple density="comfortable" icon="mdi-close" @click="enable = false"></v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import {computed} from "../../deps.js";

    export default {
        props: ["modelValue", "color", "icon"],
        emits: ["update:modelValue"],
        setup(props, context){
            const enable = computed({
                get: () => props.modelValue,
                set: v => context.emit("update:modelValue", v)
            });

            return {enable};
        }
    };
</script>