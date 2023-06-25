<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <x-reflect>
                            <v-btn color="orange-darken-1" variant="flat" @click="resetx">ResetX</v-btn>
                        </x-reflect>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {defineComponent, computed, useStore} from "../../deps.js";

    export default defineComponent({
        setup(){
            const store = useStore();

            const countx = computed(() => store.getters["user/count"]);

            function resetx(){
                store.commit("user/reset");
            }

            return {countx, resetx};
        }
    });
</script>