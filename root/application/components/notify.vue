<template>
<v-snackbar dark top timeout="-1" :color="color" :value="true">
    <v-icon left>{{icon || "mdi-information-outline"}}</v-icon>

    <span>
        <slot></slot>
    </span>

    <template #action>
        <v-btn icon @click="$store.commit('spliceNotify', key)">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </template>
</v-snackbar>
</template>

<script>
export default {
    props: {
        key: Number,
        color: String,
        icon: String
    }
};
</script>