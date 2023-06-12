<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <v-btn @click="resetx">ResetX</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        setup(){
            const store = useStore();

            const countx = computed(() => store.getters.count);

            function resetx(){
                store.commit("reset");
            }

            return {countx, resetx};
        }
    };
</script>