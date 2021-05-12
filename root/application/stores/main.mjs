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
            const handler = setTimeout(()=>{
                const index = ctx.getters.getNotifies.findIndex(({token}) => token === handler);
                if(index >= 0){
                    ctx.commit("spliceNotify", index);
                }
            }, payload?.timeout || 5000);

            ctx.commit("pushNotify", {
                message: payload.message,
                color: payload.color,
                token: handler
            });
        }
    }
};