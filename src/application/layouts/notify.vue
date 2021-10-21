<template>
<div>
    <template v-for="notify in $store.state.ui.notifies">
        <v-snackbar dark top centered timeout="-1" :key="notify.token" :color="notify.color" :value="true">
            <v-icon left>mdi-bell-ring-outline</v-icon>
            <span>{{notify.message}}</span>
        </v-snackbar>
    </template>
</div>
</template>