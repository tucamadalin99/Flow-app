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
            <div class="q-pa-md list-container" style="max-width: 500px">
              <q-list bordered>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="primary"
                      text-color="white"
                      icon="event"
                    />
                  </q-item-section>

                  <q-item-section
                    >Starts on
                    <span style="font-weight: bold">{{
                      leadProject.project.startDate
                    }}</span></q-item-section
                  >
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="primary"
                      text-color="white"
                      icon="event_available"
                    />
                  </q-item-section>

                  <q-item-section
                    >Ends on
                    <span style="font-weight: bold">{{
                      leadProject.project.endDate
                    }}</span></q-item-section
                  >
                </q-item>

                <q-separator />

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="red-8"
                      text-color="white"
                      icon="attach_money"
                    />
                  </q-item-section>

                  <q-item-section
                    >Cost:
                    <span style="font-weight: bold"
                      >{{ leadProject.project.cost }} RON</span
                    ></q-item-section
                  >
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="green-8"
                      text-color="white"
                      icon="attach_money"
                    />
                  </q-item-section>

                  <q-item-section
                    >Income:
                    <span style="font-weight: bold"
                      >{{ leadProject.project.ca }} RON</span
                    ></q-item-section
                  >
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="primary"
                      text-color="white"
                      icon="flag"
                    />
                  </q-item-section>

                  <q-item-section
                    >Profit/Loss:
                    <span style="font-weight: bold"
                      >{{
                        leadProject.project.ca - leadProject.project.cost
                      }}
                      RON</span
                    ></q-item-section
                  >
                </q-item>

                <q-separator />
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="primary"
                      text-color="white"
                      icon="people"
                    />
                  </q-item-section>
                  <q-item-section
                    >Member count:
                    <span style="font-weight: bold">{{
                      leadProject.members.length
                    }}</span></q-item-section
                  >
                </q-item>
              </q-list>
            </div>
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
            <div v-if="tasks.length > 0" class="row task-row">
              <Task
                @clicked="onClickChild"
                v-for="task in tasks"
                :key="task.name"
                :assignment="task"
                :members="members"
                :leadProject="leadProject"
                class="col"
              />
            </div>
            <div v-else class="no-tasks">
              <h4>
                No tasks added yet...
                <span><q-icon name="sentiment_dissatisfied"></q-icon></span>
              </h4>
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
        id: null,
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
      const newMember = this.deptMembers.find(
        (el) => el.id === this.selectedDropdownUser.value
      );
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
        .catch(() =>
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "warning",
            message: `Member already on the project`,
          })
        );
    },
    addTask() {
      //TODO
      if (!this.task.name || !this.task.type || !this.task.endDate) {
        this.$q.notify({
          color: "red-8",
          textColor: "white",
          icon: "warning",
          message: `Make sure you complete all the fields`,
        });
      } else {
        let createdTask = {};
        this.task.projectId = this.leadProject.project.id;
        Object.assign(createdTask, this.task);
        Axios.post(`http://localhost:8081/api/lead/addLeadTask`, createdTask, {
          withCredentials: true,
        })
          .then((response) => {
            createdTask.id = response.data.taskId;
            this.tasks.push(createdTask);
            this.task = {
              id: null,
              name: "",
              type: "",
              startDate: this.formatDate(new Date()),
              endDate: this.formatDate(new Date()),
              projectId: null,
              assignedMembers: [],
            };
            this.$q.notify({
              color: "indigo-8",
              textColor: "white",
              icon: "cloud_done",
              message: `${createdTask.name} added successfully`,
            });
          })
          .catch(() => {
            this.$q.notify({
              color: "red-8",
              textColor: "white",
              icon: "warning",
              message: `An error has occured...`,
            });
          });
      }
    },
    onClickChild(value) {
      this.tasks = this.tasks.filter((el) => el.id !== value);
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
    await this.fetchProjectTasks();
    let currentAssigned = [];
    console.log("hei", currentAssigned);
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
    if (this.getTasks) {
      currentAssigned = this.getTasks;
    }
    currentAssigned.forEach((el) => {
      let task = {};
      task.id = el.id;
      task.name = el.name;
      task.type = el.type;
      task.startDate = el.startDate;
      task.endDate = el.endDate;
      task.projectId = this.getLeadProject.project.id;
      task.assignedMembers = [];
      el.projectRefs.forEach((ref) => {
        let participant = this.members.find((m) => m.id === ref.userId);
        if (participant) {
          task.assignedMembers.push(participant);
        }
      });
      if (el.status !== "resolved") this.tasks.push(task);
    });
    console.log("all", this.leadProject);
  },
  updated() {},
  mounted() {},
};
</script>

<style scoped>
.info-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.task-row {
  display: flex;
  justify-content: center;
}

.list-container {
  width: 100%;
}
</style>