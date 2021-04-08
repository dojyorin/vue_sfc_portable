<template>
<v-container fluid>
    <v-btn @click="notify = true">Notify</v-btn>
    <vue-notify color="purple" v-model="notify">Contents</vue-notify>
</v-container>
</template>

<script>
export default {
    components: {
        "vue-notify": () => $vueLoader("./application/components/windows/notify.vue")
    },

    data(){
        return {
            notify: false
        };
    }
};
</script>