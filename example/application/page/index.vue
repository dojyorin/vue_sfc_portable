<template>
    <v-container fluid>
        <v-row>
            <v-col cols sm="12">
                <v-card>
                    <v-card-title>Title</v-card-title>
                    <v-card-subtitle>Subtitle</v-card-subtitle>

                    <v-card-text>Example</v-card-text>

                    <v-card-actions>
                        <v-btn variant="flat" color="red" class="reflect" @click="notify = true">Notify</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <x-notify color="red" v-model="notify">test</x-notify>
</template>

<script>
    import {defineComponent, ref} from "../../deps.js";

    export default defineComponent({
        setup(){
            const notify = ref(false);

            return {notify};
        }
    });
</script>

<style scoped>
    @keyframes reflect{
        0%{
            transform: scale(0) rotate(45deg);
            opacity: 0;
        }
        80%{
            transform: scale(0) rotate(45deg);
            opacity: 0.5;
        }
        81%{
            transform: scale(4) rotate(45deg);
            opacity: 1;
        }
        100%{
            transform: scale(50) rotate(45deg);
            opacity: 0;
        }
    }

    .reflect{
        position: relative;
        overflow: hidden;
        background-color: #666666;
    }
    .reflect::after{
        content: "";
        display: block;
        position: absolute;
        top: -180px;
        left: 0;
        height: 100%;
        width: 30px;
        opacity: 0;
        background-color: #FFFFFF;
        transform: rotate(45deg);
        animation: reflect 5s ease-in-out infinite;
    }
</style>