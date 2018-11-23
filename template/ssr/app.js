import Vue from 'vue';
import App from '{{ &app }}/app.vue';
import { createStore } from '{{ &app }}/store';
import { createRouter } from '{{ &app }}/router';
import { sync } from 'vuex-router-sync';

export function createApp() {
    const store = createStore();
    const router = createRouter();
    // sync the router with the vuex store.
    // this registers `store.state.route`
    sync(store, router);
    // create the app instance.
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    // expose the app, the router and the store
    return { app, router, store };
}
