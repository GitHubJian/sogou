import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const createListView = id => () =>
    import('../views/CreateListView').then(m => m.default(id));
const UserView = () => import('../views/UserView.vue');

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            {
                path: '/top/:page(\\d+)?',
                component: createListView('top')
            },
            {
                path: '/user/:id',
                component: UserView
            },
            {
                path: '/',
                redirect: '/top'
            }
        ]
    });
}
