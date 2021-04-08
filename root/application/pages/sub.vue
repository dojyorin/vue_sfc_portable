<template>
<v-container fluid>
    <v-btn @click="dialog = true">Dialog</v-btn>
    <vue-dialog maximize color="purple" title="Dialog" icon="mdi-information-outline" v-model="dialog">
        <v-card>
            <v-card-text>Contents</v-card-text>
        </v-card>
    </vue-dialog>
</v-container>
</template>

<script>
export default {
    components: {
        "vue-dialog": () => $vueLoader("./application/components/windows/dialog.vue")
    },

    data(){
        return {
            dialog: false
        };
    }
};
</script>