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

    <q-dialog v-model="addTaskDiag" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="note_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Add tasks</span>
        </q-card-section>

        <q-card-section>
          <q-input v-model="task.name" label="Task Name" />
          <q-select
            v-model="task.type"
            :options="['Work', 'Meeting', 'Other']"
            label="Task Type"
          />
        </q-card-section>
        <q-card-section>
          <p class="q-pt-sm">Deadline</p>
          <q-input
            class="q-mt-sm"
            filled
            v-model="task.endDate"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="task.endDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="addTask()" flat label="Add" color="primary" />
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
              <Division
                class="col"
                v-for="division in divisionsData"
                :key="division.name"
                :division="division"
              />
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="three">
          <div class="tasks-container">
            <q-btn
              class="q-ma-sm"
              round
              color="primary"
              icon="add"
              @click="addTaskDiag = true"
            >
            </q-btn>
            <div class="row task-row">
              <Task
                v-for="task in tasks"
                :key="task.name"
                :assignment="task"
                :members="members"
                class="col"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Task from "../components/Task";
import Axios from "axios";
import Division from "../components/Division";
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
      addTaskDiag: false,
      task: {
        name: "",
        type: "",
        startDate: this.formatDate(new Date()),
        endDate: this.formatDate(new Date()),
        projectId: null,
        assignedMembers: [],
      },
      tasks: [],
    };
  },
  components: {
    Division,
    Task,
  },
  methods: {
    formatDate(date) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) dd = `0${dd}`;
      if (mm < 10) mm = `0${mm}`;

      return `${yyyy}/${mm}/${dd}`;
    },
    handleAddMember() {
      console.log(this.selectedDropdownUser);
      const newMember = this.deptMembers.find(
        (el) => el.id === this.selectedDropdownUser.value
      );
      console.log(this.selectedDivision);
      Axios.post(
        `http://localhost:8081/api/lead/addToProject/${newMember.id}/${this.leadProject.project.id}/${this.selectedDivision.value}`,
        {},
        { withCredentials: true }
      )
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "cloud_done",
            message: `Member was added to the project`,
          });
          this.members.push(newMember);
          this.divisionsData
            .find((el) => el.name === this.selectedDivision.label)
            .members.push(newMember);
        })
        .catch((err) =>
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "warning",
            message: `Member already on the project`,
          })
        );

      console.log(newMember, this.leadProject, this.selectedDivision.value);
    },
    addTask() {
      //TODO
      console.log("adding");
      const createdTask = {};
      Object.assign(createdTask, this.task);
      this.tasks.push(createdTask);
      this.task = {
        name: "",
        type: "",
        startDate: this.formatDate(new Date()),
        endDate: this.formatDate(new Date()),
        projectId: null,
        assignedMembers: [],
      };
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
    if (this.getUser.department === "Information Technology") {
      this.divisionDropdown.push({ label: "Front-End", value: 3 });
      this.divisionDropdown.push({ label: "Back-End", value: 2 });
      this.divisionsData.push({ name: "Front-End", members: [] });
      this.divisionsData.push({ name: "Back-End", members: [] });
      this.leadProject.members.forEach((el, i) => {
        let member = this.deptMembers.find((e) => e.id === el.userId);
        if (member) {
          if (el.roleId === 2) {
            this.divisionsData[1].members.push(member);
            this.members.push(member);
          }
          if (el.roleId === 3) {
            this.divisionsData[0].members.push(member);
            this.members.push(member);
          }
        }
      });
    } else {
      let roleId = 0;
      if (this.getUser.department === "Public Relations") roleId = 1;
      if (this.getUser.department === "Human Resources") roleId = 4;
      if (this.getUser.department === "Sales") roleId = 5;
      if (roleId !== 0)
        this.divisionDropdown.push({
          label: this.getUser.department,
          value: roleId,
        });
      this.divisionsData.push({ name: this.getUser.department, members: [] });
      this.leadProject.members.forEach((el) => {
        let member = this.deptMembers.find((e) => e.id === el.userId);
        if (member) {
          this.divisionsData[0].members.push(member);
          this.members.push(member);
        }
      });
    }
    console.log(this.divisionsData);
  },
  updated() {
    console.log("updated");
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
.tasks-container {
  text-align: center;
}

.member-diag {
  width: 30%;
}
.members-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>