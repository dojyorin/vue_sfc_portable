export function vxState(){
    return {
        vNotifyVisible: false,
        vNotifyMessage: "",
        vNotifyColor: "",
        vLoadingVisible: false,
        vDrawerVisible: false,
        menuCount: 1
    };
}

export const vxGet = {};

export const vxSet = {
    vNotify(state, payload){
        state.vNotifyVisible = false;
        state.vNotifyMessage = payload?.message ?? "";
        state.vNotifyColor = payload?.color ?? "";
        state.vNotifyVisible = true;
    },

    vLoading(state, payload){
        state.vLoadingVisible = payload;
    },

    vDrawer(state, payload){
        state.vDrawerVisible = payload;
    }
};

export const vxAction = {};