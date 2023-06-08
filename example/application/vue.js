import {createApp, fetchComponent} from "../deps.js";
import {route} from "./route.js";
import {store} from "./store.js";
import {vuetify} from "./vuetify.js";

const vue = createApp(await fetchComponent(import.meta.resolve("./main.vue"))());

vue.use(route);
vue.use(store);
vue.use(vuetify);

export {vue};