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
            let activityArray = {};
            let parsedUser = {};
            parsedUser.id = user.id;
            parsedUser.name = user.name + " " + user.surname;
            parsedUser.department = user.department.name;
            parsedUser.email = user.email;
            parsedUser.phone = user.phone;
            parsedUser.role = user.role;
            parsedUser.facebook = user.facebook;
            parsedUser.git = user.git;
            parsedUser.status = user.status;
            user.projectRefs.forEach(el => {
                activityArray[el.project.id] = {};
                activityArray[el.project.id].name = el.project.name;
                activityArray[el.project.id].tasks = [];
            })
            user.projectRefs.forEach(el => activityArray[el.project.id].tasks.push(el.task))
            parsedUser.activity = activityArray;
            parsedUser.display = true;
            parsedUsers.push(parsedUser);
        })
        commit('setUsers', parsedUsers);
    }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    setVisibleLeadChip: (state, user) => {
        const i = state.users.map(usr => usr.id).indexOf(user.id);
        //state.users[i].display = false;
        state.users[i].display = true;
    },
    setInvisibleLeadChip: (state, user) => {
        const i = state.users.map(usr => usr.id).indexOf(user.id);
        state.users[i].display = false;
        
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}