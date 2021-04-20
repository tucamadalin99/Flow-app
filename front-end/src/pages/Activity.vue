<template>
  <div class="activity-container">
    <particles-bg
      class="particles"
      color="#2d6cb5"
      num="15"
      type="cobweb"
      :canvas="{ backgroundColor: '#fffff' }"
      :bg="true"
    />
    <h3 v-if="Object.keys(this.activities).length !== 0">
      <strong>Activity</strong>
    </h3>
    <div v-else class="no-activity-container q-pa-md">
      <h2 class="text-weight-regular message">
        <q-icon name="warning" class="text-blue icon" />
        You have no activity, get to work!
      </h2>
    </div>
    <div class="row activity">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :projectName="activity.name"
        :tasks="activity.tasks"
        :logo="activity.logo"
      />
    </div>
  </div>
</template>
<script>
import ActivityCard from "../components/ActivityCard";
import { ParticlesBg } from "particles-bg-vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ActivityPage",
  data() {
    return {
      activities: [],
      ok: false,
    };
  },
  methods: {
    ...mapActions(["fetchActivity"])
  },
  computed: mapGetters(["getActivity"]),
  async created() {
    await this.fetchActivity();
    this.activities = this.getActivity;
  },
  components: {
    ActivityCard,
    ParticlesBg,
  },
};
</script>
<style scoped>
h2,
h3 {
  text-align: center;
}
.activity {
  justify-content: center;
  z-index: 2;
}
.activity-container {
  padding: 20px;
}
.no-activity-container {
  margin-top: 25vh;
}

.icon {
  font-size: 5rem;
}

@media only screen and (max-width: 600px) {
  .no-activity-container {
    margin-top: 25vh;
  }

  .icon {
    font-size: 2rem;
  }

  .message {
    font-size: 2.6vh;
  }

  .particles {
    display: none;
  }
}
</style>