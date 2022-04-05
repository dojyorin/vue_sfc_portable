<template>
    <v-app>
        <v-snackbar dark top centered :color="$store.state.vNotifyColor" v-model="$store.state.vNotifyVisible">
            <v-icon left>mdi-bell-ring-outline</v-icon>
            <span>{{$store.state.vNotifyMessage}}</span>
        </v-snackbar>

        <v-overlay dark z-index="9" opacity="0.9" v-model="$store.state.vLoadingVisible">
            <v-progress-circular indeterminate size="128" width="6" color="blue">
                <span class="white--text">Loading...</span>
            </v-progress-circular>
        </v-overlay>

        <v-navigation-drawer app temporary v-model="$store.state.vDrawerVisible">
            <v-toolbar dark color="blue" :height="$vuetify.application.top">
                <v-btn icon @click="$store.commit('vDrawer', false)">
                    <v-icon large>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>Menu</v-toolbar-title>
            </v-toolbar>

            <v-list>
                <template v-for="(page, i) in drawerPages">
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

        <v-app-bar app dark color="blue" height="52">
            <v-app-bar-nav-icon @click="$store.commit('vDrawer', true)"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>

            <v-spacer></v-spacer>

            <vue-menu system color="purple" title="User" icon="mdi-account-circle">
                <template #activator="{on}">
                    <v-badge overlap top color="grey" offset-y="20" offset-x="20" class="mr-n3" :content="$store.state.menuCount">
                        <v-btn icon v-on="on">
                            <v-icon large>mdi-account-circle</v-icon>
                        </v-btn>
                    </v-badge>
                </template>

                <v-card>
                    <v-card-text>Contents</v-card-text>
                </v-card>
            </vue-menu>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app dark tile padless color="blue">
            <v-row no-gutters justify="center">
                Copyright
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        components: {
            "vue-menu": () => $vueLoader("./application/component/menu.vue")
        },

        data(){
            return {
                drawerPages: [{
                    title: "Main",
                    to: "/",
                    icon: "mdi-home"
                }, {
                    title: "Sub",
                    to: "/sub",
                    icon: "mdi-account-circle"
                }, {
                    title: "Worker",
                    to: "/worker",
                    icon: "mdi-memory"
                }]
            };
        }
    };
</script>