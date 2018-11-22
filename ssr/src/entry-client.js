import Vue from 'vue';
import { createApp } from './app';

const { app, router, store } = createApp();

// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {});

app.$mount('#app');

// navigator.serviceWorker.register('/service-worker.js');
