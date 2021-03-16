import Axios from 'axios';

const state = {
    leadProject: {

    }
};

const getters = {
    getLeadProject: (state) => state.leadProject
};

const actions = {
    async fetchLeadProject({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/lead/getLeadProject', { withCredentials: true });
        console.log(response.data);
        commit('setLeadProject', response.data);
    }
};

const mutations = {
    setLeadProject: (state, project) => (state.leadProject = project)
};

export default {
    state,
    getters,
    actions,
    mutations
}