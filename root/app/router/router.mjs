import index from "./index.mjs";
import sub from "./sub.mjs";

const list = [
    index,
    sub
];

const routes = list.flatMap(({parents, routes})=>{
    return Object.entries(routes ?? {}).map(([route, resource])=>{
        return {
            path: (parents?.route ?? "") + route,
            component: async()=> VueLoader.loadComponent((parents?.resource ?? "") + resource)
        };
    });
});

export default {
    routes
};