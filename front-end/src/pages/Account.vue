<template>
  <div class="account-container">
    <particles-bg
      class="particles"
      color="#2d6cb5"
      num="80"
      type="cobweb"
      :canvas="{ backgroundColor: '#fffff' }"
      :bg="true"
    />
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
              v-model="getUser.fullName"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 30 || 'Name too long',
              ]"
            />
            <p class="details">Department</p>
            <q-input
              dense
              v-model="getUser.department"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 30 || 'Department name too long',
              ]"
            />
            <p class="details">Division</p>
            <q-input
              dense
              v-model="getUser.division"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 30 || 'Division name too long',
              ]"
            />
            <p class="details">Position</p>
            <q-input
              dense
              v-model="getUser.role"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 30 || 'Position name too long',
              ]"
            />
            <p class="details">Facebook</p>
            <q-input
              dense
              v-model="getUser.facebook"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 50 || 'Facebook link too long',
              ]"
            />
            <p class="details">Git</p>
            <q-input
              dense
              v-model="getUser.git"
              autofocus
              @keyup.enter="prompt = false"
              :rules="[
                (val) => (val && val.length > 0) || 'Cannot be empty',
                (val) => val.length < 30 || 'Git link too long',
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              @click="handleUpdate"
              flat
              label="Save changes"
              v-close-popup
            />
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
    <div class="vertical-center">
      <q-btn
        @click="toggleEditInfo"
        id="edit-btn"
        round
        color="primary"
        icon="create"
      />
    </div>
    <div class="account-info">
      <q-list>
        <chip
          :elementName="`Nume`"
          :elementValue="this.user.fullName"
          :value="this.user.fullName"
        ></chip>
        <chip
          :elementName="`Departament`"
          :elementValue="this.user.department"
        ></chip>
        <chip
          :elementName="`Divizie`"
          :elementValue="this.user.division"
        ></chip>
        <chip :elementName="`Pozitie`" :elementValue="this.user.role"></chip>
        <chip
          :elementName="`Facebook`"
          :elementValue="this.user.facebook"
        ></chip>
        <chip :elementName="`Git`" :elementValue="this.user.git"></chip>
      </q-list>
    </div>
  </div>
</template>

<script>
import chip from "../components/Chip";
import { ParticlesBg } from "particles-bg-vue";
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  name: "AccountPage",
  data() {
    return {
      user: {},
      alert: false,
      confirm: false,
      prompt: false,
      // address: "",
    };
  },
  components: {
    chip,
    ParticlesBg,
  },
  methods: {
    toggleEditInfo: function () {
      if (!this.prompt) {
        this.prompt = true;
      }
    },
    handleUpdate: function () {
      const names = this.user.fullName.split(" ");
      const updatedUser = {
        name: names[0],
        surname: names[1],
        division: this.user.division,
        role: this.user.role,
        facebook: this.user.facebook,
        git: this.user.git,
      };
      Axios.put("http://localhost:8081/api/user/updateInfo", updatedUser, {
        withCredentials: true,
      })
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "cloud_done",
            message: `User info updated succesfully!`,
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: `An error occured`,
          });
        });
    },
    ...mapActions(["fetchUser"]),
  },
  computed: mapGetters(["getUser"]),

  created() {
    console.log("before create");
    // console.log(this.user);
    // this.fetchUser();
    this.user = this.getUser;
  },
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
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
  align-items: center;
  margin: 0 auto;
  width: fit-content;
  padding: 1%;
  border-radius: 8px;
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
  align-self: center;

  height: 45px;
}
.edit-popup {
  display: grid;
}

.vertical-center {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  margin-top: 4px;
}
.justify-end {
  justify-content: center;
}
.details {
  /* margin: 0 auto; */
  margin-bottom: 2px;
  margin-top: 5px;
  /* 
   */
  color: rgba(60, 68, 66, 0.445);
}
.q-chip[data-v-39323a7c] {
  width: auto;
}
.q-list {
  margin-top: 5px;
}
@media only screen and (max-width: 600px) {
  .particles {
    display: none;
  }
}
</style>
