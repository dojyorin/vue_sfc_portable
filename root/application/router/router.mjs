import route0 from "./index.mjs";
import route1 from "./main.mjs";

const routes = [
    route0,
    route1
];

export default {
    routes: routes.flatMap(({parent, paths})=>{
        return Object.entries(paths).map(([route, resource])=>{
            return {
                path: parent.route + route,
                component: ()=> $vueLoader(parent.resource + resource)
            };
        });
    })
};