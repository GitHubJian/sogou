import config from '../config';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const { project, folder } = config;

// const UserView = () => import('../views/UserView.vue');
import Helloworld from '../views/helloworld.vue';

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            { path: `/${project}/${folder}/index.html`, component: Helloworld }
        ]
    });
}
