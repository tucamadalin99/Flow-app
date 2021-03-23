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
                    :key="user.id"
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
                <q-card-section>
                  <q-chip v-for="task in tasks" :key="task.id">
                    {{ task.name + " until " + task.endDate }}
                    <q-btn
                      round
                      v-model="task.visible"
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
                      @click="addDialog = true"
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
              icon="drafts"
              label="Drafts"
              header-class="text-purple"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
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
import Axios from "axios";
export default {
  name: "Team",
  data() {
    return {
      lead: {},
      users: [],
      tasks: [],
      alert: false,
      taskAlert: false,
      addDialog: false,
      selectedUser: {},
      selectedTask: {},
      currentDepartmentUsers: [],
      addUser: null,
      componentKey: 0,
    };
  },
  methods: {
    async remove(user) {
      await Axios.delete(
        `http://localhost:8081/api/lead/removeFromProject/${user.id}`,
        { withCredentials: true }
      );
      this.setVisibleLeadChip(user);
      this.removeUser(user);
      this.users.splice(user.id, 1);
      console.log(this.users);
      this.$q.notify({
        color: "indigo-8",
        textColor: "white",
        icon: "cloud_done",
        message: `${user.name} was removed from the project`,
      });
    },
    async removeTask(task){
      await Axios.delete(`http://localhost:8081/api/lead/removeTaskLead/${task.id}`, {withCredentials: true})
      this.setVisibleTaskChip(task);
        const i = this.tasks.map(t => t.id).indexOf(task.id);
      this.tasks.splice(i, 1);
      this.$q.notify({
        color: "indigo-8",
        textColor: "white",
        icon: "cloud_done",
        message: `${task.name} was removed from the project`,
      });
    },
    async addToProject(name) {
      let addUser = this.getUsers.find((user) => user.name === name);
      try {
        await Axios.post(
          `http://localhost:8081/api/lead/addToProject/${addUser.id}/${this.getLeadProject.project.id}`,
          null,
          { withCredentials: true }
        );
        this.addUserToProjectStore(addUser.id);
        this.users.push(addUser);
        this.$q.notify({
          color: "indigo-8",
          textColor: "white",
          icon: "cloud_done",
          message: `${addUser.name} was added to the project`,
        });
        console.log(this.users);
        this.forceRerender();
      } catch {
        this.$q.notify({
          color: "red-7",
          textColor: "white",
          icon: "warning",
          message: `${addUser.name} is already a member`,
        });
      }
    },
    toggleAlert(user) {
      this.selectedUser = user;
      this.alert = true;
      console.log(this.selectedUser);
    },
    toggleTaskAlert(task){
      this.selectedTask = task;
      this.taskAlert = true;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    ...mapMutations([
      "removeUser",
      "addUserToProjectStore",
      "setVisibleLeadChip",
      "setVisibleTaskChip",
      "setUsers",
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
        this.currentDepartmentUsers.push(user.name);
    });
    this.tasks = this.getTasks;
  },
};
</script>

<style scoped>
.lead-card {
  width: 100%;
  max-width: 800px;
}
</style>