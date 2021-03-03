import Axios from 'axios';

const state = {
    users: []
};

const getters = {
    getUsers: (state) => state.users
};

const actions = {
    async fetchUsers({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/other/getAllUsers', { withCredentials: true });
        let parsedUsers = [];
        response.data.forEach(user => {
            let parsedUser = {};
            parsedUser.name = user.name + " " + user.surname;
            parsedUser.department = user.department.name;
            parsedUser.email = user.email;
            parsedUser.phone = user.phone;
            parsedUser.role = user.role;
            parsedUser.facebook = user.facebook;
            parsedUser.git = user.git;
            parsedUser.status = user.status;
            parsedUsers.push(parsedUser);
        })
        commit('setUsers', parsedUsers);
        // console.log(parsedUsers);
    }
};

const mutations = {
    setUsers: (state, users) => (state.users = users)
};

export default {
    state,
    getters,
    actions,
    mutations
}