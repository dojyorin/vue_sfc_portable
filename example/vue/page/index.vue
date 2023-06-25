<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{count}} : {{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <v-btn color="green" variant="flat" @click="increment">Increment</v-btn>
                        <v-btn color="purple" variant="flat" @click="incrementx">IncrementX</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {defineComponent, ref, computed, useStore} from "../../deps.js";

    export default defineComponent({
        setup(){
            const store = useStore();

            const count = ref(0);

            const countx = computed(() => store.getters["user/count"]);

            function increment(){
                count.value++;

                store.commit("overlay/notifyPush", {
                    color: "green",
                    message: "Increment!"
                });
            }

            function incrementx(){
                store.commit("user/increment");

                store.commit("overlay/notifyPush", {
                    color: "purple",
                    message: "IncrementX!"
                });
            }

            return {count, countx, increment, incrementx};
        }
    });
</script>