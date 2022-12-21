<template>
    <v-snackbar dark top centered :color="$store.getter.vNotify.color" v-model="$store.getter.vNotify.visible">
        <v-icon left>mdi-bell-ring-outline</v-icon>
        <span>{{$store.getter.vNotify.message}}</span>
    </v-snackbar>
</template>