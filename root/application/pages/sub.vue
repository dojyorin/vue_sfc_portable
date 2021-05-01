<template>
<div>
<v-list>
    <v-subheader>List</v-subheader>

    <v-list-item @click="dialog = true">
        <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>Dialog</v-list-item-title>
            <v-list-item-subtitle>Subtitle</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</v-list>

<vue-dialog maximize color="purple" title="Dialog" icon="mdi-information-outline" v-model="dialog">
    <v-card>
        <v-card-text>Contents</v-card-text>
    </v-card>
</vue-dialog>
</div>
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