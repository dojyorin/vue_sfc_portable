<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{count}} : {{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <v-btn @click="increment">Increment</v-btn>
                        <v-btn @click="incrementx">IncrementX</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <x-notify color="info" v-model="notify">Update!</x-notify>
</template>

<script>
    import {defineComponent, ref} from "../../deps.js";

    export default defineComponent({
        setup(){
            const store = useStore();

            const countx = computed(() => store.getters.count);

            const count = ref(0);
            const notify = ref(false);

            function increment(){
                count.value++;
                notify.value = true;
            }

            function incrementx(){
                store.commit("increment");
                notify.value = true;
            }

            return {countx, count, notify, increment, incrementx};
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