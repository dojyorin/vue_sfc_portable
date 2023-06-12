<template>
    <v-snackbar position="fixed" location="top" :color="color" v-model="model">
        <slot></slot>

        <template #actions>
            <v-btn ripple density="comfortable" icon="mdi-close" @click="model = false"></v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import {computed} from "../../deps.js";

    export default {
        props: ["modelValue", "color"],
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