<template>
  <div class="q-pa-md">
    <h2>{{ lead.project.name }}</h2>
    <p v-for="user in users" :key="user.id">
      {{ user.name + "-" + user.role }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Team",
  data() {
    return {
      lead: {},
      users: [],
    };
  },
  computed: {
    ...mapGetters(["getLeadProject", "getUsers", "getUser"]),
  },
  created() {
    this.lead = this.getLeadProject;
    let index = 0;
    this.lead.members.forEach((el) => {
      this.users.push(this.getUsers.find((user) => user.id === el));
    });
  },
};
</script>

<style>
</style>