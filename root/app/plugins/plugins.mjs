import saveFile from "./savefile.mjs";

const list = [
    saveFile
];

const plugins = {
    install(Vue){
        for(const plugin of list){
            Vue.prototype[`$${plugin.name}`] = plugin;
        }
    }
};

export default plugins;