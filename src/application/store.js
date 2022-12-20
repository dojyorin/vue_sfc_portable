export function state(){
    return {
        vNotifyVisible: false,
        vNotifyMessage: "",
        vNotifyColor: "",
        vLoadingVisible: false,
        vDrawerVisible: false,
        menuCount: 1
    };
}

export const getter = {};

export const setter = {
    vNotify(s, payload){
        s.vNotifyVisible = false;
        s.vNotifyMessage = payload?.message ?? "";
        s.vNotifyColor = payload?.color ?? "";
        s.vNotifyVisible = true;
    },

    vLoading(s, payload){
        s.vLoadingVisible = payload;
    },

    vDrawer(s, payload){
        s.vDrawerVisible = payload;
    }
};

export const action = {};