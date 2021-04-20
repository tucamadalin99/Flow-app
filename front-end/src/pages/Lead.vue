<template>
  <div class="q-pa-md all">
    <q-dialog class="member-diag" v-model="addMembersDiag">
      <q-card class="member-diag">
        <q-card-section>
          <div class="text-h6">Add members to your team</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            outlined
            v-model="selectedDropdownUser"
            :options="membersDropdown"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-select>

        <q-separator spaced />

          <q-select
            outlined
            v-model="selectedDivision"
            :options="divisionDropdown"
          >
            <template v-slot:prepend>
              <q-icon name="build" />
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            @click="handleAddMember"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card class="main-card">
      <q-card-section>
        <div class="text-h6">{{ leadProject.project.name }}</div>
        <div class="text-subtitle2">Lead Administration</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-blue">
        <q-tab label="Project Info" name="one" />
        <q-tab label="Your Team" name="two" />
        <q-tab label="Assignments" name="three" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="info-container">
            <p class="text-bold">
              Start date: {{ leadProject.project.startDate }}
            </p>
            <p class="text-bold">End date: {{ leadProject.project.endDate }}</p>
          </div>
        </q-tab-panel>
        <q-tab-panel name="two">
          <div class="team-container">
            <q-btn
              class="q-ma-sm"
              round
              color="primary"
              icon="add"
              @click="addMembersDiag = true"
            >
            </q-btn>
            <p class="text-h5" v-if="members.length == 0">
              Your team does not have any members yet.
            </p>
            <div class="members-container row">
              <Division class="col" v-for="division in divisionsData" :key="division.name" :division="division"/>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="three">
          With so much content to display at once, and often so little screen
          real-estate, Cards have fast become the design pattern of choice for
          many companies, including the likes of Google and Twitter.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Task from "../components/Task";
import Axios from "axios";
import Division from '../components/Division';
export default {
  data() {
    return {
      tab: "one",
      leadProject: {},
      deptMembers: [],
      membersDropdown: [],
      divisionDropdown: [],
      divisionsData: [],
      selectedDropdownUser: "Pick department member",
      selectedDivision: "Select Division",
      members: [],
      addMembersDiag: false,
    };
  },
  components: {
    Division
  },
  methods: {
    handleAddMember() {
      console.log(this.selectedDropdownUser);
      const newMember = this.deptMembers.find(el => el.id === this.selectedDropdownUser.value);
      this.divisionsData.find(el => el.name === this.selectedDivision).members.push(newMember);
    },
    ...mapMutations([
      "removeUser",
      "addUserToProjectStore",
      "setVisibleLeadChip",
      "setInvisibleLeadChip",
      "setVisibleTaskChip",
      "setInvisibleTaskChip",
      "setUsers",
      "addStoreTask",
    ]),
    ...mapActions([
      "fetchUsers",
      "fetchLeadProject",
      "fetchProjectTasks",
      "fetchDeptMembers",
    ]),
  },
  computed: {
    ...mapGetters([
      "getLeadProject",
      "getUsers",
      "getUser",
      "getTasks",
      "getDeptMembers",
    ]),
  },
  async created() {
    await this.fetchLeadProject();
    await this.fetchDeptMembers();
    this.leadProject = this.getLeadProject;
    this.deptMembers = this.getDeptMembers;
    this.membersDropdown = this.deptMembers.map((el) => {
      return { label: `${el.name} ${el.surname}`, value: el.id };
    });
    console.log(this.getUser);
    if(this.getUser.department === "Information Technology"){
      console.log("heha")
      this.divisionDropdown.push("Front-End");
      this.divisionDropdown.push("Back-End");
      this.divisionsData.push({name: "Front-End", members: []});
      this.divisionsData.push({name: "Back-End", members: []})
    }else{
      this.divisionDropdown.push(this.getUser.department);
      this.divisionsData.push({name: this.getUser.department, members: []});
    }
  },
};
</script>

<style scoped>
.info-container {
  text-align: center;
}
.team-container {
  text-align: center;
}

.member-diag {
  width: 30%;
}
.members-container{
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>