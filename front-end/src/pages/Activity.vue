<template>
  <div class="activity-container">
    <h2><strong>Activity</strong></h2>
    <div class="row activity">
      <activityCard
        v-for="activity in activities"
        :key="activity.taskName"
        :projectName="activity.project"
        :taskName="activity.taskName"
        :startDate="activity.startDate"
        :endDate="activity.endDate"
        :status="activity.status"
      >
      </activityCard>
    </div>
  </div>
</template>
<script>
import activityCard from "../components/ActivityCard";
import { mapGetters } from "vuex";
export default {
  name: "ActivityPage",
  data() {
    return {
      activities: [],
    };
  },
  computed: mapGetters(["getActivity"]),
  created() {
    this.activities = this.getActivity;
    console.log(this.activities);
  },
  components: {
    activityCard,
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.activity {
  justify-content: center;
  z-index: 2;
}
</style>