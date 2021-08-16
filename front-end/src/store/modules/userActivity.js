import Axios from 'axios';

const state = {
    activity: {
    },
    currentTasks: {
    },
    ok: false
};

const getters = {
    getActivity: (state) => state.activity,
    getCurrentTasks: (state) => state.currentTasks
};

const actions = {
    async fetchActivity({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/user/activity/resolved', { withCredentials: true });
        commit('setActivity', response.data);
    },
    async fetchCurrentTasks({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/user/activity/pending', { withCredentials: true });
        commit('setCurrentTasks', response.data);
    }
};

const mutations = {
    setActivity: (state, activity) => (state.activity = activity),
    setCurrentTasks: (state, tasks) => (state.currentTasks = tasks)
};

export default {
    state,
    getters,
    actions,
    mutations
}