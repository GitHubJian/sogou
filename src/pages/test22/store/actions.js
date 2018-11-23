import { serverFetchUser, clientFetchUser } from 'api';

export default {
    SERVER_FETCH: ({ commit, state }) => {
        return serverFetchUser().then(({ name }) =>
            commit('SERVER_SET', { name })
        );
    },
    CLIENT_FETCH: ({ commit, stat }) => {
        return clientFetchUser().then(({ name }) =>
            commit('CLIENT_SET', { name })
        );
    }
};
