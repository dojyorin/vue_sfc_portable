<template>
    <v-snackbar dark top centered :color="$store.getters.notifyColor" v-model="notify">
        <v-icon left>mdi-bell-ring-outline</v-icon>
        <span>{{$store.getters.notifyMessage}}</span>
    </v-snackbar>
</template>

<script>
    export default {
        computed: {
            notify: {
                get(){
                    return this.$store.getters.notifyVisible;
                },

                set(v){
                    this.$store.commit("notifyVisible", v);
                }
            }
        }
    };
</script>