import config from '../config';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const { project, folder } = config;

const HelloAsync = () => import('../views/HelloAsync.vue');
import Helloworld from '../views/helloworld.vue';

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            { path: `/${project}/${folder}/index.html`, component: Helloworld },
            { path: `/${project}/${folder}/async.html`, component: HelloAsync }
        ]
    });
}
