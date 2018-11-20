import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import foo from './lib/foo.vue';
// async import
const bar = () => import(/* webpackChunkName: 'bar' */ './lib/bar.vue');
const dynamic = () => import('./lib/dynamic.vue');

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/index/foo.html',
            component: foo
        },
        {
            path: '/index/bar.html',
            component: bar
        },
        {
            path: '/index/path.html',
            component: dynamic
        }
    ]
});
