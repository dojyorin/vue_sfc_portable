<template>
    <v-snackbar dark top centered :color="$store.getters.vNotify.color" v-model="$store.getters.vNotify.visible">
        <v-icon left>mdi-bell-ring-outline</v-icon>
        <span>{{$store.getters.vNotify.message}}</span>
    </v-snackbar>
</template>