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

export default function createStore() {
    return new Vuex.Store({
        state: {
            item: ''
        },
        action: {
            fetchItem({ commit }) {
                return fetch().then(({ item }) => {
                    cosnoel.log(item)
                    commit('setItem', { item });
                });
            }
        },
        mutations: {
            setItem(state, { item }) {
                Vue.set(state.item, item);
            }
        }
    });
}
