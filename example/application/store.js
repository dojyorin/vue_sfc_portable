import {createStore} from "vuex";

export const store = createStore({
    state(){
        return {
            count: 0,
            loading: true
        };
    },

    getters: {
        count(s){
            return s.count;
        },
        loading(s){
            return s.loading;
        }
    },

    mutations: {
        increment(s){
            s.count++;
        },
        reset(s){
            s.count = 0;
        },
        overlay(s, v){
            s.loading = v;
        }
    }
});