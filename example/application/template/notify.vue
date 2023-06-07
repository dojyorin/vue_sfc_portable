<template>
    <v-snackbar position="fixed" location="top" offset="" :color="message.color" value>
        <v-icon left v-if="message.icon">{{message.icon}}</v-icon>
        <span>{{message.text}}</span>
    </v-snackbar>
</template>

<script>
    import {inject} from "../../deps.js";

    export default {
        setup(){
            const message = inject("message");

            return {message};
        }
    };
</script>