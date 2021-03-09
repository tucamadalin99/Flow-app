import Axios from 'axios';

const state = {
    user: {
        // fullName: "Codrin Pardea",
        // division: "Back-end",
        // department: "IT",
        // role: "Developer",
        // email: "pompi@gmail.com",
        // facebook: "facebook.com/pompi",
        // git: "github/pompi"
    }
};

const getters = {
    getUser: (state) => state.user
};

const actions = {
    async fetchUser({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/user/profile', { withCredentials: true });
        commit('setUser', response.data);
    }
};

const mutations = {
    setUser: (state, user) => (state.user = user)
};

export default {
    state,
    getters,
    actions,
    mutations
}