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
    notifyVisible(s){
        return s.notifyVisible;
    },

    notifyContent(s){
        return {
            message: s.notifyMessage,
            color: s.notifyColor
        };
    },

    loadingVisible(s){
        return s.loadingVisible;
    },

    navVisible(s){
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
    notifyVisible(s, p){
        s.notifyVisible = p;
    },

    notifyContent(s, p){
        s.notifyVisible = false;
        s.notifyMessage = p.message;
        s.notifyColor = p.color;
        s.notifyVisible = true;
    },

    loadingVisible(s, p){
        s.loadingVisible = p;
    },

    navVisible(s, p){
        s.navVisible = p;
    }
};

export const action = {};