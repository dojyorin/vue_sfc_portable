<template>
<div>
<v-container fluid>
    <v-row>
        <v-col cols sm="12">
            <v-card>
                <v-card-title>Title</v-card-title>
                <v-card-subtitle>Subtitle</v-card-subtitle>

                <v-card-text>Example</v-card-text>

                <v-card-actions>
                    <v-btn dark color="purple" @click="notify = true">Notify</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>

<vue-notify color="purple" v-model="notify">Contents</vue-notify>
</div>
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