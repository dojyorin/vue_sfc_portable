<template>
    <v-app-bar app dark dense color="blue">
        <!-- <v-app-bar-nav-icon @click="openNav()"></v-app-bar-nav-icon> -->
        <v-toolbar-title>Application</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <ct-menu system color="purple" title="User" icon="mdi-account-circle">
            <template #activator="{on}">
                <v-badge overlap top color="grey" offset-y="20" offset-x="20" class="mr-n3" :content="$store.getters.menuCount">
                    <v-btn icon v-on="on">
                        <v-icon large>mdi-account-circle</v-icon>
                    </v-btn>
                </v-badge>
            </template>

            <v-card>
                <v-card-text>Contents</v-card-text>
            </v-card>
        </ct-menu> -->
    </v-app-bar>
</template>

<script>
    const {defineComponent} = await import("vue");
    const {fetchAsyncComponent} = await import("./deps.js");

    export default {
        // components: {
        //     "ct-menu": fetchAsyncComponent("./application/component/menu.vue")
        // },

        // methods: {
        //     openNav(){
        //         this.$store.commit("navVisible", true);
        //     }
        // }
    };
</script>