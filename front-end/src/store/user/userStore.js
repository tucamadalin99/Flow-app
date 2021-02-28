import Axios from 'axios'

const state = {

};

const getters = {};
const actions = {
    async fetchProfile({
        commit
    }) {
        const response = await Axios.get('http://localhost:8081/api/user/profile');
        commit('SET_PROFILE', response.data);
    }
};

const mutations = {
    SET_PROFILE: (state, payload) => {
        state = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}