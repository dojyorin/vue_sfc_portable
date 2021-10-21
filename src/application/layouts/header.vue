<template>
<v-app-bar app dark :color="$store.state.ui.colorMain" height="52">
    <v-app-bar-nav-icon @click="$store.dispatch('ui/vDrawer', true)"></v-app-bar-nav-icon>
    <v-toolbar-title>Application</v-toolbar-title>

    <v-spacer></v-spacer>

    <vue-menu system color="purple" title="User" icon="mdi-account-circle">
        <template #activator="{on}">
            <v-badge overlap top color="grey" offset-y="20" offset-x="20" class="mr-n3" :content="count">
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
</template>

<script>
export default {
    components: {
        "vue-menu": () => $vueLoader("./application/components/menu.vue")
    },

    data(){
        return {
            count: 0
        };
    },

    async mounted(){
        const db = await $fetch("./media/data.json");
        this.count = db.length;
    }
}
</script>