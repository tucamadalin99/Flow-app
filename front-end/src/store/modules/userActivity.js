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
        console.log(response.data);
        commit('setActivity', response.data);
        // Axios.get('http://localhost:8081/api/user/activity', { withCredentials: true }).then(response => {
        //     console.log(response.data);
        //     this.state.ok = true;
        // })
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