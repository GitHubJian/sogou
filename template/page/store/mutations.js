import Vue from 'vue';

export default {
    SERVER_SET: (state, { name }) => {
        Vue.set(state.server, 'name', 'server');
    },
    CLIENT_SET: (state, { name }) => {
        // Vue.set(state.client, 'name', name);
    }
};
