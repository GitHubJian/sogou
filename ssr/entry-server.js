import Vue from 'vue';
import App from './App.vue';
import createStore from './store';

export default function(context) {
    const store = createStore();

    let app = new Vue({
        store,
        render: h => h(App)
    });

    return App.fetchdata().then(res => {
        Vue.set(store.state, res);
        context.state = store.state;

        return app;
    });
}
