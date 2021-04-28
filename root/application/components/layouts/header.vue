<template>
<vue-menu system fix="r" color="purple" title="Notify" icon="mdi-bell-outline" :count="count">
    <v-card>
        <v-card-text>Contents</v-card-text>
    </v-card>
</vue-menu>
</template>

<script>
export default {
    components: {
        "vue-menu": () => $vueLoader("./application/components/windows/menu.vue")
    },

    props: {
        contents: Array
    },

    data(){
        return {
            count: 0
        };
    },

    async mounted(){
        const db = await $fetchEx("./data/database.json");
        this.count = db.length;
    }
};
</script>