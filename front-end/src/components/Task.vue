<template>
  <div class="q-pa-md" style="max-width: 350px">
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
      <q-btn
        class="q-ma-sm"
        round
        color="primary"
        icon="person_add"
        @click="addMembersDiag = true"
      >
      </q-btn>
    </q-toolbar>

    <q-list bordered>
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
          <q-icon name="chat_bubble" color="green" />
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
    };
  },
  methods: {
    handleAdd() {
      console.log(this.member.value);
      if (!this.member.value) {
        this.$q.notify({
          color: "red-8",
          textColor: "white",
          icon: "warning",
          message: `Please pick a participant from the dropdown`,
        });
      } else {
        const assignee = this.members.find((el) => el.id === this.member.value);
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
    },
  },
  created() {
    this.options = this.members.map((el) => {
      return { label: `${el.name} ${el.surname}`, value: el.id };
    });
    console.log(this.options);
  },
};
</script>
<style scoped>
.type {
  text-align: center;
  display: flex;
}


</style>