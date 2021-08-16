<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm text-bold"
            >Removing {{selectedMember.name}}: Are you sure?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Remove" color="primary" @click="handleRemove" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{ division.name }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="member in division.members"
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
import Axios from 'axios';
export default {
  data() {
    return {
      confirm: false,
      selectedMember: {},
      selectedIndex : -1
    };
  },
  props: ["division"],
  methods: {
    handleRemoveDialog(member) {
      this.selectedIndex = this.division.members.indexOf(member);
      this.selectedMember = member;
      this.confirm = true;
    },
    handleRemove(){
      this.division.members.splice(this.selectedIndex, 1);
      Axios.delete(`http://localhost:8081/api/lead/removeFromProject/${this.selectedMember.id}`, {withCredentials: true}).then(()=> {
        this.$q.notify({
              color: "indigo-8",
              textColor: "white",
              icon: "cloud_done",
              message: `${this.selectedMember.name} was removed to the project`,
            });
      })
       .catch(() => {
         this.$q.notify({
              color: "red-8",
              textColor: "white",
              icon: "error",
              message: `Some error occured...`,
            });
       })
    }
  },
};
</script>