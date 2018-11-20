import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import foo from './lib/foo.vue';
import bar from './lib/bar.vue';

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
        }
    ]
});
