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
    setLeadProject: (state, project) => (state.leadProject = project),
    removeUser: (state, user) => {
        const i = state.leadProject.members.map(usr => usr).indexOf(user.id);
        state.leadProject.members.splice(i, 1);
    },
    addUserToProjectStore: (state, user) => {
        state.leadProject.members.push(user);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}