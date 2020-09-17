import saveFile from "./save_file.mjs";
import imageLoader from "./image_loader.mjs";
import unixDate from "./unix_date.mjs";

const list = [
    saveFile,
    imageLoader,
    unixDate
];

function install(ctx){
    for(const plugin of list){
        ctx.prototype[`$$${plugin.name}`] = plugin;
    }
}

export default {
    install
};