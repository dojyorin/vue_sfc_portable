import store0 from "./index.mjs";
import store1 from "./user.mjs";

const stores = [
    store1
];

export default {
    ...store0,
    modules: stores.reduce((ctx, store)=>{
        const {name} = store;
        delete store.name;
        return Object.defineProperty(ctx, name, {
            value: store
        });
    }, {})
};