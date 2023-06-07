<template>
    <v-list>
        <v-subheader>List</v-subheader>

        <v-list-item>
            <template #prepend>
                <v-icon>mdi-account</v-icon>
            </template>

            <v-list-item-title>Title</v-list-item-title>
            <v-list-item-subtitle>Sub</v-list-item-subtitle>

            <!-- <v-list-item-action>
                <ct-dialog persistent maximize color="purple" title="Dialog" icon="mdi-information-outline" v-model="dialog">
                    <template #activator>
                        <v-btn icon @click.stop="dialog = true">
                            <v-icon>mdi-information-outline</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>Contents</v-card-text>
                    </v-card>
                </ct-dialog>
            </v-list-item-action> -->
        </v-list-item>
    </v-list>
</template>

<script>
    import {defineComponent, defineAsyncComponent, fetchAsyncComponent} from "../../deps.js";

    export default {
        // components: {
        //     "ct-dialog": fetchAsyncComponent("../component/dialog.vue")
        // },

        // data(){
        //     return {
        //         dialog: false
        //     };
        // },

        // async mounted(){
        //     this.$store.commit("loadingVisible", true);
        //     await new Promise(res => setTimeout(res, 1000));
        //     this.$store.commit("loadingVisible", false);
        // }
    };
</script>