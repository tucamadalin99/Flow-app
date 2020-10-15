<template>
  <div class="account-container">
    <div class="edit-popup">
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Edit user details</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p class="details">Name</p>
            <q-input
              dense
              v-model="memberName"
              autofocus
              @keyup.enter="prompt = false"
            />
            <p class="details">Department</p>
            <q-input
              dense
              v-model="department"
              autofocus
              @keyup.enter="prompt = false"
            />
            <p class="details">Division</p>
            <q-input
              dense
              v-model="division"
              autofocus
              @keyup.enter="prompt = false"
            />
            <p class="details">Position</p>
            <q-input
              dense
              v-model="position"
              autofocus
              @keyup.enter="prompt = false"
            />
            <p class="details">Facebook</p>
            <q-input
              dense
              v-model="facebook"
              autofocus
              @keyup.enter="prompt = false"
            />
            <p class="details">Git</p>
            <q-input
              dense
              v-model="git"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save changes" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="account-header">
      <q-avatar size="130px" class="avatar">
        <img
          class="profile-pic"
          src="https://cdn.quasar.dev/img/boy-avatar.png"
        />
      </q-avatar>
    </div>
    <div class="account-info">
      <q-list>
        <div class="vertical-center">
          <q-btn
            @click="toggleEditInfo"
            id="edit-btn"
            round
            color="primary"
            icon="rate_review"
          />
        </div>
        <chip :elementName="`Nume`" :elementValue="this.memberName"></chip>
        <chip
          :elementName="`Departament`"
          :elementValue="this.department"
        ></chip>
        <chip :elementName="`Divizie`" :elementValue="this.division"></chip>
        <chip :elementName="`Pozitie`" :elementValue="this.position"></chip>
        <chip :elementName="`Facebook`" :elementValue="this.facebook"></chip>
        <chip :elementName="`Git`" :elementValue="this.git"></chip>
      </q-list>
    </div>
  </div>
</template>

<script>
import chip from "../components/Chip";
export default {
  name: "AccountPage",
  data() {
    return {
      memberName: "Ionut Popete",
      department: "IT",
      division: "Back-end",
      position: "Member",
      facebook: "facebook.com/popete.ionut",
      git: "@popete",
      alert: false,
      confirm: false,
      prompt: false,
      address: ""
    };
  },
  components: {
    chip
  },
  methods: {
    toggleEditInfo: function() {
      if (!this.prompt) {
        this.prompt = true;
      }
    }
  }
};
</script>
<style scoped>
.account-header {
  display: grid;
  justify-content: center;
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
}
.avatar {
  margin-top: 10px;
  margin-bottom: 10px;
}
.profile-pic {
  border: 3px solid #2d6cb5;
}
.account-info {
  display: flex;
  justify-content: center;
}
.q-chip {
  padding: 7px 12px;
  width: 120px;
}

/* .row {
  justify-content: center;
  text-align: center;
} */
.padding {
  padding: 10px;
  flex-wrap: nowrap;
}
.info-text {
  display: flex;
  justify-content: center;
  opacity: 0.5;
  color: rgb(255, 255, 255);
}
.q-btn {
  position: relative;
  left: 43px;
  align-self: center;

  height: 45px;
}
.edit-popup {
  display: grid;
}

.vertical-center {
  position: relative;
  left: 39px;
  justify-content: center;
  margin-bottom: 4px;
  margin-top: 4px;
}
.justify-end {
  justify-content: center;
}
.details {
  margin: 0 auto;
  margin-bottom: 2px;
  margin-top: 5px;
  text-align: center;
}
</style>
