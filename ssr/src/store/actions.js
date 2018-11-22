import { fetchUser } from '../api';

export default {
    FETCH_USER: ({ commit, dispatch, state }, { id }) => {
        return state.users[id]
            ? Promise.resolve(state.users[id])
            : fetchUser(id).then(user => commit('SET_USER', { id, user }));
    }
};
