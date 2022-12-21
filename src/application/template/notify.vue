<template>
    <v-snackbar dark top centered :color="$store.getters.notifyContent.message" v-model="notify">
        <v-icon left>mdi-bell-ring-outline</v-icon>
        <span>{{$store.getters.notifyContent.color}}</span>
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