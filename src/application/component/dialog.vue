<template>
    <v-dialog scrollable :persistent="persistent" :fullscreen="full" :width="width" :value="value">
        <template #activator="bridge">
            <slot name="activator" v-bind="bridge"></slot>
        </template>

        <v-card :flat="full" :tile="full">
            <v-system-bar window dark :color="color">
                <v-icon left>{{icon}}</v-icon>
                <span>{{title}}</span>

                <v-spacer></v-spacer>

                <v-btn v-if="maximize" icon tile @click="full = !full">
                    <v-icon v-if="full" class="mr-0">mdi-window-restore</v-icon>
                    <v-icon v-else class="mr-0">mdi-window-maximize</v-icon>
                </v-btn>

                <v-btn icon tile @click="$emit('input', false)">
                    <v-icon class="mr-0">mdi-window-close</v-icon>
                </v-btn>
            </v-system-bar>

            <v-card-text class="pa-0">
                <slot></slot>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            title: String,
            color: String,
            icon: String,
            width: Number,
            persistent: Boolean,
            maximize: Boolean
        },

        data(){
            return {
                full: false
            };
        }
    };
</script>