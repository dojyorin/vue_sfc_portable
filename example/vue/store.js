import {createStore} from "../deps.js";

export const store = createStore({
    modules: {
        overlay: {
            namespaced: true,

            state(){
                return {
                    loading: true,
                    notifies: []
                };
            },

            getters: {
                loading(s){
                    return s.loading;
                },

                notifies(s){
                    return s.notifies;
                }
            },

            mutations: {
                loading(s, v){
                    s.loading = v;
                },

                notifyPush(s, v){
                    s.notifies.push(v);
                },

                notifyPull(s, v){
                    s.notifies.splice(v);
                }
            }
        },

        user: {
            namespaced: true,

            state(){
                return {
                    count: 0
                };
            },

            getters: {
                count(s){
                    return s.count;
                }
            },

            mutations: {
                increment(s){
                    s.count++;
                },

                reset(s){
                    s.count = 0;
                }
            }
        }
    }
});