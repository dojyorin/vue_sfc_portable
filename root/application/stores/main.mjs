export default {
    state(){
        return {
            notifies: []
        };
    },

    getters: {
        getNotifies({notifies}){
            return notifies;
        }
    },

    mutations: {
        pushNotify({notifies}, payload){
            notifies.push(payload);
        },

        spliceNotify({notifies}, i){
            notifies.splice(i, 1);
        }
    },

    actions: {
        vNotify(ctx, payload){
            const timer = setTimeout(()=>{
                const index = ctx.getters.getNotifies.findIndex(({token}) => token === timer);
                if(index < 0){
                    return;
                }
                ctx.commit("spliceNotify", index);
            }, payload?.timeout || 5000);

            ctx.commit("pushNotify", {
                message: payload.message,
                color: payload.color,
                token: timer
            });
        }
    }
};