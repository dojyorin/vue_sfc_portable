import {namespaced, state, getters, mutations, actions} from "./index.mjs";
import sub from "./sub.mjs";

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,

    modules: {
        sub
    }
};