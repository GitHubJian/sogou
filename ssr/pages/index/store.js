import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function fetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ item: 'xiaows' });
        }, 100);
    });
}

const store = new Vuex.Store({
    state: {
        item: {}
    },
    actions: {
        fetchItem({ commit }) {
            // `store.dispatch()` 会返回 Promise，
            // 以便我们能够知道数据在何时更新
            return fetch().then(({ item }) => {
                commit('setItem', { item });
            });
        }
    },
    mutations: {
        setItem(state, { item }) {
            Vue.set(state, 'item', item);
        }
    }
});

export default store;
