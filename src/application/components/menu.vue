<template>
<v-menu offset-y min-width="300" :close-on-content-click="false">
    <template #activator="bridge">
        <slot name="activator" v-bind="bridge"></slot>
    </template>

    <v-card>
        <v-system-bar v-if="system" window dark :color="$store.state.ui.colorSub">
            <v-icon left>{{icon}}</v-icon>
            <span>{{title}}</span>
        </v-system-bar>

        <v-card-text class="pa-0">
            <slot></slot>
        </v-card-text>
    </v-card>
</v-menu>
</template>

<script>
export default {
    props: {
        system: Boolean,
        title: String,
        icon: String
    }
};
</script>