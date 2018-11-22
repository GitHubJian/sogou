import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';

export function createApp() {
    // create store and router instances
    const store = createStore();
    const router = createRouter();
    // this registers `store.state.route`
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return { app, router, store };
}
