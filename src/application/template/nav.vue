<template>
    <v-navigation-drawer app temporary v-model="nav">
        <v-toolbar dark color="blue" :height="$vuetify.application.top">
            <v-btn icon @click="nav = false">
                <v-icon large>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>Menu</v-toolbar-title>
        </v-toolbar>

        <v-list>
            <template v-for="(page, i) in pages">
                <v-list-item :key="i" :to="page.to">
                    <v-list-item-icon>
                        <v-icon>{{page.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{page.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        computed: {
            nav: {
                get(){
                    return this.$store.getters.navVisible;
                },

                set(v){
                    this.$store.commit("navVisible", v);
                }
            }
        },

        data(){
            return {
                pages: [{
                    title: "Main",
                    to: "/",
                    icon: "mdi-home"
                }, {
                    title: "Sub",
                    to: "/sub",
                    icon: "mdi-account-circle"
                }]
            };
        }
    };
</script>