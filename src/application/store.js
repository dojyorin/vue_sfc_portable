export function state(){
    return {
        notifyVisible: false,
        notifyMessage: "",
        notifyColor: "",
        loadingVisible: false,
        navVisible: false,
        themeColor: "blue",
        menuCount: 1
    };
}

export const getter = {
    vNotify(s){
        return {
            visible: s.notifyVisible,
            message: s.notifyMessage,
            color: s.notifyColor
        };
    },

    vLoading(s){
        return s.loadingVisible;
    },

    vNav(s){
        return s.navVisible;
    },

    themeColor(s){
        return s.themeColor;
    },

    menuCount(s){
        return s.menuCount;
    }
};

export const setter = {
    vNotify(s, payload){
        s.notifyVisible = false;
        s.notifyMessage = payload.message;
        s.notifyColor = payload.color;
        s.notifyVisible = true;
    },

    vLoading(s, payload){
        s.loadingVisible = payload;
    },

    vNav(s, payload){
        s.navVisible = payload;
    },

    menuCount(s){
        return s.menuCount;
    }
};

export const action = {};