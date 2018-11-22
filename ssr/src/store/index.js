import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            users: {
                /* [id: string]: User */
            }
        },
        actions,
        mutations,
        getters
    });
}
