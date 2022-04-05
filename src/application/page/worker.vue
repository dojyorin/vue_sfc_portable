<template>
    <v-container fluid>
        <v-btn dark color="orange" @click="echo()">Worker</v-btn>
    </v-container>
</template>

<script>
    export default {
        methods: {
            echo(){
                const worker = new Worker("./worker/echo.js");

                worker.addEventListener("message", ({data})=>{
                    console.log(`Main: ${data}`);
                });

                worker.postMessage("foobar");
            }
        }
    };
</script>