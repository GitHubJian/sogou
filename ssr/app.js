import Vue from 'vue';
import App from './App.vue';
import store from './index/store.js';

const app = new Vue({
    store,
    render: h => h(App)
});

export { 
    app, 
    store, 
    App 
};
