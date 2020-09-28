import saveFile from "./save_file.mjs";
import imageLoader from "./image_loader.mjs";
import unixDate from "./unix_date.mjs";

const plugins = [
    saveFile,
    imageLoader,
    unixDate
];

export default {
    install(ctx){
        for(const plugin of plugins){
            ctx.prototype[`$$${plugin.name}`] = plugin;
        }
    }
};