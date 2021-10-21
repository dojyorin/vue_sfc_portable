<template>
<v-overlay dark z-index="9" opacity="0.9" :value="$store.state.ui.loading">
    <v-progress-circular indeterminate size="128" width="6" :color="$store.state.ui.colorMain">
        <span class="white--text">Loading...</span>
    </v-progress-circular>
</v-overlay>
</template>