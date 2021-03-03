import Axios from 'axios';

const state = {
    activity: {

    }
};

const getters = {
    getActivity: (state) => state.activity
};

const actions = {
    async fetchActivity({ commit }) {
        const response = await Axios.get('http://localhost:8081/api/user/activity', { withCredentials: true });
        let activityArray = [];
        response.data.projectRefs.forEach(obj => {
            let parsedActivity = {};
            parsedActivity.project = obj.project.name;
            parsedActivity.taskName = obj.task.name;
            parsedActivity.startDate = obj.task.startDate;
            parsedActivity.endDate = obj.task.endDate;
            parsedActivity.status = obj.task.status;
            activityArray.push(parsedActivity);
        })
        console.log(activityArray);
        commit('setActivity', activityArray);
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