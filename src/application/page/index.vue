<template>
<v-container fluid>
    <v-row>
        <v-col cols sm="12">
            <v-card>
                <v-card-title>Title</v-card-title>
                <v-card-subtitle>Subtitle</v-card-subtitle>

                <v-card-text>Example</v-card-text>

                <v-card-actions>
                    <v-btn dark color="green" @click="dispatchNotify()">Notify</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    methods: {
        dispatchNotify(){
            this.$store.commit("vNotify", {
                message: "Test",
                color: "success"
            });
        }
    }
};
</script>