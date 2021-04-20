import Axios from 'axios';

const state = {
    leadProject: {
    },
    tasks: [],
    deptMembers: []
};

const getters = {
    getLeadProject: (state) => state.leadProject,
    getTasks: (state) => state.tasks,
    getDeptMembers: (state) => state.deptMembers
};

const actions = {
    async fetchLeadProject({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/lead/getLeadProject', { withCredentials: true });
        console.log(response.data);
        commit('setLeadProject', response.data);
    },
    async fetchProjectTasks({ commit }) {
        const projectResponse = await Axios.get('http://localhost:8081/api/lead/getLeadProject', { withCredentials: true });
        const projectId = projectResponse.data.project.id;
        if (projectId) {
            const response = await Axios.get(`http://localhost:8081/api/lead/getTasks/${projectId}`, { withCredentials: true });
            let parsed = response.data;
            parsed.forEach(tsk => tsk.display = true);
            console.log("parsed", parsed);
            commit('setTasks', parsed);
        }
    },
    async fetchDeptMembers({ commit }) {
        const deptResponse = await Axios.get('http://localhost:8081/api/lead/getDeptMembers', { withCredentials: true });
        commit('setDeptMembers', deptResponse.data);
    }
};

const mutations = {
    setLeadProject: (state, project) => (state.leadProject = project),
    setTasks: (state, tasks) => (state.tasks = tasks),
    setDeptMembers: (state, members) => (state.deptMembers = members),
    setVisibleTaskChip: (state, task) => {
        const i = state.tasks.findIndex(t => t.id === task.id)
        state.tasks[i].display = true;
    },
    setInvisibleTaskChip: (state, task) => {
        const i = state.tasks.findIndex(t => t.id === task.id)
        state.tasks[i].display = false;
        console.log(i);
    },
    removeUser: (state, user) => {
        const i = state.leadProject.members.map(usr => usr).indexOf(user.id);
        state.leadProject.members.splice(i, 1);
    },
    removeStoreTask: (state, task) => {
        const i = state.tasks.members.map(t => t).indexOf(task.id);
        state.tasks.splice(i, 1);
    },
    addUserToProjectStore: (state, user) => {
        state.leadProject.members.push(user);
    },
    addStoreTask: (state, task) => {
        state.tasks.push(task);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}