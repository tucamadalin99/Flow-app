<template >
  <div v-if="this.lead.members.length > 0" class="q-pa-md flex flex-center">
    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Remove {{ selectedUser.name }} from the project?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Remove"
            @click="remove(selectedUser)"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="taskAlert" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Remove {{ selectedTask.name }} from the project?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Remove"
            @click="removeTask(selectedTask)"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Add member to team</span>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="addUser"
            :options="currentDepartmentUsers"
            label="Your department"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Add"
            @click="addToProject(addUser)"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addTaskDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="note_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Add tasks</span>
        </q-card-section>

        <q-card-section>
          <q-input v-model="task.name" label="Task Name" />
          <q-input v-model="task.type" label="Task Type" />
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

    <q-dialog v-model="addAssignmentDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Assign member to task</span>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="assignedMember"
            :options="memberNames"
            label="Your department"
          />
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="assignedTask"
            :options="taskNames"
            label="Available Tasks"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Add" @click="addToTask" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card class="lead-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-top text-center text-h4">
          {{ lead.project.name }}
        </div>
      </q-img>
      <q-card-section>
        <div class="q-pa-md" style="max-width: 400px; margin: 0 auto">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="groups"
              label="Team members"
            >
              <q-card>
                <q-card-section :key="componentKey">
                  <q-chip
                    v-for="user in users"
                    :key="user.id + 'U'"
                    v-model="user.display"
                  >
                    {{ user.name + " - " + user.role }}
                    <q-btn
                      round
                      @click="toggleAlert(user)"
                      class="q-ml-sm q-mt-sm q-mb-sm"
                      size="8px"
                      color="red-7"
                      icon="close"
                    />
                  </q-chip>
                  <q-separator spaced />
                  <p>
                    <q-btn
                      @click="addDialog = true"
                      size="10px"
                      round
                      color="primary"
                      icon="add"
                    />
                    Add member
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="assignment" label="Tasks">
              <q-card>
                <q-card-section :key="componentKey">
                  <q-chip
                    v-for="task in tasks"
                    :key="task.id + 'T'"
                    v-model="task.display"
                  >
                    {{ task.name + " until " + task.endDate }}
                    <q-btn
                      round
                      v-model="task.display"
                      @click="toggleTaskAlert(task)"
                      class="q-ml-sm q-mt-sm q-mb-sm"
                      size="8px"
                      color="red-7"
                      icon="close"
                    />
                  </q-chip>
                  <q-separator spaced />
                  <p>
                    <q-btn
                      @click="addTaskDialog = true"
                      size="10px"
                      round
                      color="primary"
                      icon="add"
                    />
                    Add Task
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              @click="getMemberNames"
              icon="assignment_ind"
              label="Assignments"
              header-class="text-purple"
            >
              <q-card>
                <q-card-section>
                  <q-separator spaced />
                  <p>
                    <q-btn
                      @click="addAssignmentDialog = true"
                      size="10px"
                      round
                      color="primary"
                      icon="add"
                    />
                    Assign member
                  </p>
                  <Task
                    v-for="assignment in assignments"
                    :key="assignment.id"
                    :assignment="assignment"
                  />
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Task from "../components/Task";
import Axios from "axios";
export default {
  name: "Team",
  data() {
    return {
      lead: {},
      users: [],
      tasks: [],
      assignments: [],
      memberNames: [],
      members: [],
      emails: [],
      taskNames: [],
      alert: false,
      taskAlert: false,
      addDialog: false,
      addTaskDialog: false,
      addAssignmentDialog: false,
      selectedUser: {},
      selectedTask: {},
      currentDepartmentUsers: [],
      addUser: null,
      assignedTask: null,
      assignedMember: null,
      componentKey: 0,
      task: {
        name: "",
        startDate: this.formatDate(new Date()),
        endDate: this.formatDate(new Date()),
        type: "",
        projectId: null,
        display: true,
      },
      addingTask: {},
    };
  },
  components: {
    Task,
  },
  methods: {
    async remove(user) {
      await Axios.delete(
        `http://localhost:8081/api/lead/removeFromProject/${user.id}`,
        { withCredentials: true }
      );
      this.setInvisibleLeadChip(user);
      this.removeUser(user);
      let index = this.users.findIndex((el) => el === user);
      this.users.splice(index, 1);
      console.log(this.users);
      this.$q.notify({
        color: "indigo-8",
        textColor: "white",
        icon: "cloud_done",
        message: `${user.name} was removed from the project`,
      });
    },
    async removeTask(task) {
      await Axios.delete(
        `http://localhost:8081/api/lead/removeTaskLead/${task.id}`,
        { withCredentials: true }
      );
      this.$q.notify({
        color: "indigo-8",
        textColor: "white",
        icon: "cloud_done",
        message: `${task.name} was removed from the project`,
      });
      console.log(task);
      let index = this.tasks.findIndex((el) => el.id === task.id);
      this.tasks.splice(index, 1);
      this.setInvisibleTaskChip(task);
      let asIndex = this.assignments.findIndex((el) => el.id === task.id);
      if (asIndex >= 0) {
        this.assignments.splice(asIndex, 1);
      }
      //this.forceRerender();
      //console.log(task);
    },
    async addToProject(name) {
      try {
        await Axios.post(
          `http://localhost:8081/api/lead/addToProject/${this.addUser.value}/${this.getLeadProject.project.id}`,
          null,
          { withCredentials: true }
        );
        this.addUserToProjectStore(this.addUser.value);
        this.$q.notify({
          color: "indigo-8",
          textColor: "white",
          icon: "cloud_done",
          message: `${this.addUser.label} was added to the project`,
        });
        let addedUser = this.getUsers.find(
          (user) => user.id === this.addUser.value
        );
        this.users.push(addedUser);
        console.log(this.users);
        this.setVisibleLeadChip(addedUser);
        this.forceRerender();
      } catch {
        this.$q.notify({
          color: "red-7",
          textColor: "white",
          icon: "warning",
          message: `${this.addUser.label} is already a member`,
        });
      }
    },
    addToTask() {
      // let found = this.tasks.find((tsk) => tsk.id == this.assignedTask.value);
      // console.log(found);
      // found.members = [];
      // //found.members.push({name: this.assignedMember})
      // let member = this.users.find(
      //   (usr) => usr.id == this.assignedMember.value
      // );
      // found.members.push(member);
      // console.log(found);
      console.log(this.tasks);
      //bugs
    },
    toggleAlert(user) {
      this.selectedUser = user;
      this.alert = true;
      console.log(this.selectedUser);
    },
    toggleTaskAlert(task) {
      this.selectedTask = task;
      this.taskAlert = true;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    formatDate(date) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) dd = `0${dd}`;
      if (mm < 10) mm = `0${mm}`;

      return `${yyyy}/${mm}/${dd}`;
    },
    async addTask() {
      Object.assign(this.addingTask, this.task);
      this.addingTask.projectId = this.getLeadProject.project.id;
      const response = await Axios.post(
        "http://localhost:8081/api/lead/addLeadTask",
        this.addingTask,
        { withCredentials: true }
      );
      this.addingTask.id = response.data.taskId;
      this.addStoreTask(this.addingTask);
      this.tasks.push(this.addingTask);
      this.setVisibleTaskChip(this.addingTask);
      this.$q.notify({
        color: "indigo-8",
        textColor: "white",
        icon: "cloud_done",
        message: `${this.addingTask.name} was added to the project`,
      });
      const firstAssign = {
        id: this.addingTask.id,
        name: this.addingTask.name,
        members: [{letter: this.getUser.fullName[0], name: this.getUser.fullName, email: this.getUser.email}],
      };
      this.assignments.push(firstAssign);
      this.forceRerender();
      console.log("test1", this.addingTask, this.assignments);
      this.task = {
        name: "",
        startDate: this.formatDate(new Date()),
        endDate: this.formatDate(new Date()),
        type: "",
        projectId: null,
        display: true,
      };
      this.addingTask = {};
    },
    getMemberNames() {
      if (this.users.length > 0) {
        this.memberNames = [];
        this.emails = [];
        this.users.forEach((user) => {
          this.memberNames.push({ label: user.name, value: user.id });
          this.emails.push({ label: user.email, value: user.id });
        });
      }
      if (this.tasks.length > 0) {
        this.taskNames = [];
        this.tasks.forEach((task) => {
          this.taskNames.push({ label: task.name, value: task.id });
        });
      }
      console.log(this.emails);
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
    ...mapActions(["fetchUsers"]),
  },
  computed: {
    ...mapGetters(["getLeadProject", "getUsers", "getUser", "getTasks"]),
  },
  created() {
    this.lead = this.getLeadProject;
    if (this.lead.members.length > 0)
      this.lead.members.forEach((el) => {
        this.users.push(this.getUsers.find((user) => user.id === el));
      });

    const currentUser = this.getUser;
    this.getUsers.forEach((user) => {
      if (user.department === currentUser.department)
        this.currentDepartmentUsers.push({ label: user.name, value: user.id });
    });
    this.getTasks.forEach((task) => {
      this.tasks.push(task);
    });

    console.log(currentUser);

    this.getTasks.forEach((task) => {
      let obj = {};
      obj.id = task.id;
      obj.name = task.name;
      obj.members = [];
      // console.log(task);
      if (task.projectRefs.length > 0) {
        task.projectRefs.forEach((ref, i) => {
          obj.members.push(this.users.find((usr) => usr.id === ref.userId));
          obj.members[i].letter = obj.members[i].name[0];
        });
      }

      this.assignments.push(obj);
    });
    console.log(this.assignements);
  },
};
</script>

<style scoped>
.lead-card {
  width: 100%;
  max-width: 800px;
}
</style>