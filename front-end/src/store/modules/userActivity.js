import Axios from 'axios';

const state = {
    activity: {
    },
    ok: false
};

const getters = {
    getActivity: (state) => state.activity
};

const actions = {
    async fetchActivity({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/user/activity', { withCredentials: true });
        commit('setActivity', response.data);
    }
};

const mutations = {
    setActivity: (state, activity) => (state.activity = activity)
};

export default {
    state,
    getters,
    actions,
    mutations
}