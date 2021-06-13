<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm text-bold"
            >Removing {{ selectedMember.name }}: Are you sure?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Remove"
            color="primary"
            @click="handleRemove"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addMembersDiag" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add participants</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            dense
            v-model="member"
            :options="options"
            autofocus
            @keyup.enter="addMembersDiag = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add participant" @click="handleAdd" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{ assignment.name }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item class="action-btns">
        <q-btn
          class="q-ma-sm"
          round
          color="primary"
          icon="person_add"
          @click="addMembersDiag = true"
        >
        </q-btn>

        <q-btn
          class="q-ma-sm"
          round
          @click="markResolved"
          color="green"
          icon="check"
        >
        </q-btn>

        <q-btn
          @click="deleteTask"
          class="q-ma-sm"
          round
          color="red-8"
          icon="remove"
        >
        </q-btn>
      </q-item>
      <q-item>
        <p class="text-h6 type">
          {{ assignment.type }} until {{ assignment.endDate }}
        </p>
      </q-item>
      <q-item
        v-for="member in assignment.assignedMembers"
        :key="member.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ member.name[0] }}{{ member.surname[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ member.name }} {{ member.surname }}</q-item-label>
          <q-item-label caption lines="1">{{ member.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="person_remove"
            @click.stop="handleRemoveDialog(member)"
            color="red-8"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  props: ["assignment", "members"],
  data() {
    return {
      addMembersDiag: false,
      member: "Pick participant",
      options: [],
      confirm: false,
      selectedMember: {},
      currentIndex: 0,
      selectedIndex: -1,
    };
  },
  methods: {
    handleAdd() {
      if (!this.member.value) {
        this.$q.notify({
          color: "red-8",
          textColor: "white",
          icon: "warning",
          message: `Please pick a participant from the dropdown`,
        });
      } else {
        if (
          this.assignment.assignedMembers.find(
            (el) => el.id === this.member.value
          )
        ) {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "warning",
            message: `User already on this task!`,
          });
        } else {
          const assignee = this.members.find(
            (el) => el.id === this.member.value
          );
          this.assignment.assignedMembers.push(assignee);
          Axios.post(
            `http://localhost:8081/api/lead/assignTask`,
            {
              projectId: this.assignment.projectId,
              userId: assignee.id,
              taskId: this.assignment.id,
            },
            { withCredentials: true }
          )
            .then(() => {
              this.$q.notify({
                color: "indigo-8",
                textColor: "white",
                icon: "cloud_done",
                message: `${assignee.name} ${assignee.surname} added successfully`,
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
      }
    },
    handleRemoveDialog(member) {
      this.selectedIndex = this.members.indexOf(member);
      this.selectedMember = member;
      this.confirm = true;
      console.log(member);
      console.log(this.assignment);
    },
    handleRemove() {
      this.assignment.assignedMembers = this.assignment.assignedMembers.filter(
        (el) => el.name !== this.selectedMember.name
      );
      console.log(this.assignment);
      console.log();
      const deletion = {
        userId: this.selectedMember.id,
        projectId: this.assignment.projectId,
        taskId: this.assignment.id,
        departmentId: this.selectedMember.departmentId,
      };
      Axios.delete(
        `http://localhost:8081/api/lead/removeFromTask/${deletion.userId}/${deletion.projectId}/${deletion.taskId}/${deletion.departmentId}`,
        {
          withCredentials: true,
        }
      )
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "cloud_done",
            message: `${this.selectedMember.name} was removed to the task`,
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "error",
            message: `Some error occured...`,
          });
        });
    },
    markResolved() {
      Axios.put(
        `http://localhost:8081/api/user/markResolved/${this.currentIndex}`,
        {},
        { withCredentials: true }
      )
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "cloud_done",
            message: `Task was resolved, it will be cleared at the next access!`,
          });
          this.$emit("clicked", this.currentIndex);
        })
        .catch(() => {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "error",
            message: `Some error occured...`,
          });
        });
    },
    deleteTask() {
      Axios.delete(
        `http://localhost:8081/api/lead/removeTaskLead/${this.currentIndex}`,
        { withCredentials: true }
      )
        .then(() => {
          this.$q.notify({
            color: "yellow-8",
            textColor: "white",
            icon: "cloud_done",
            message: `Task was removed`,
          });
          this.$emit("clicked", this.currentIndex);
        })
        .catch(() => {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "error",
            message: `Some error occured...`,
          });
        });
    },
  },
  created() {
    this.options = this.members.map((el) => {
      return { label: `${el.name} ${el.surname}`, value: el.id };
    });
    this.currentIndex = this.assignment.id;
  },
};
</script>
<style scoped>
.type {
  width: 100%;
  text-align: center;
}
.action-btns {
  display: flex;
  justify-content: center;
}
</style>