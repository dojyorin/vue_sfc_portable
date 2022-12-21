<template>
    <v-overlay dark z-index="999" opacity="0.9" v-model="$store.getters.vLoading">
        <v-progress-circular indeterminate size="128" width="6" color="blue">
            <span class="white--text">Loading...</span>
        </v-progress-circular>
    </v-overlay>
</template>