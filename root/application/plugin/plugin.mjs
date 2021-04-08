import plugin0 from "./save_file.mjs";
import plugin1 from "./image_loader.mjs";
import plugin2 from "./unix_date.mjs";

const plugins = [
    plugin0,
    plugin1,
    plugin2
];

export default {
    install(ctx){
        for(const plugin of plugins){
            ctx.prototype[`$$${plugin.name}`] = plugin;
        }
    }
};