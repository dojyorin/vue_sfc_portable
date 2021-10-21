export default {
    state(){
        return {
            notifies: [],
            drawer: false,
            loading: false,
            colorMain: "blue",
            colorSub: "purple"
        };
    },

    getters: {
        notifies(state){
            return state.notifies;
        }
    },

    mutations: {
        pushNotify(state, payload){
            state.notifies.push(payload);
        },

        popNotify(state, payload){
            state.notifies.splice(payload, 1);
        },

        toggleDrawer(state, payload){
            state.drawer = payload;
        },

        toggleLoading(state, payload){
            state.loading = payload;
        }
    },

    actions: {
        vNotify(ctx, payload){
            const timer = setTimeout(() => ctx.commit("popNotify", ctx.getters.notifies.findIndex(({token}) => token === timer)), payload?.timeout || 5000);
            ctx.commit("pushNotify", {
                message: payload?.message ?? "",
                color: payload?.color ?? "success",
                token: timer
            });
        },

        vDrawer(ctx, payload){
            ctx.commit("toggleDrawer", payload);
        },

        vLoading(ctx, payload){
            ctx.commit("toggleLoading", payload);
        }
    }
};