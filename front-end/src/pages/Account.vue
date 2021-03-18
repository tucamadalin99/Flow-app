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
              v-model="user.fullName"
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
              v-model="user.department"
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
              v-model="user.division"
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
              v-model="user.role"
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
              v-model="user.facebook"
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
              v-model="user.git"
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

    <!-- <div class="vertical-center">
      <q-btn
        @click="toggleEditInfo"
        id="edit-btn"
        round
        color="primary"
        icon="create"
      />
    </div> -->
    <div class="profile-info flex flex-center">
      <q-card class="my-card">
        <q-card-section class="section">
          <div class="account-header">
            <q-avatar size="130px" class="avatar">
              <img
                class="profile-pic"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-avatar>
            <div class="edt-btn">
              <q-btn
                @click="toggleEditInfo"
                id="edit-btn"
                round
                color="primary"
                icon="create"
              />
            </div>
            <div class="inner-name" style="position: absolute; top: 145px">
              <p class="text-h6" style="color: white">
                {{ user.fullName }}
              </p>
            </div>
          </div>
          <q-separator spaced />
        </q-card-section>
        <!-- <p class="text-h6">
            <q-icon size="md" name="person" />{{ user.fullName }}
          </p> -->
        <q-card-section class="section flex flex-center">
          <q-card class="inner-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="text-h5 absolute-bottom text-center">
                {{ user.department }}
              </div>
            </q-img>
            <q-card-section>
              <p class="text-body1">Your status</p>
              <q-badge
                v-if="user.status === 'Active'"
                class="text-body1"
                color="green"
              >
                {{ user.status }}
              </q-badge>
              <q-badge
                v-else-if="user.status === 'Inactive'"
                class="text-body1"
                color="red-8"
              >
                {{ user.status }}
              </q-badge>
              <q-badge v-else class="text-body1" color="orange">
                {{ user.status }}
              </q-badge>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section>
          <!-- <p class="text-h6">
            <q-icon size="md" name="person" />{{ user.fullName }}
          </p>
          <q-separator spaced style="width: 300px" /> -->

          <p class="text-h6">
            <q-icon size="md" name="build" />{{ user.role }}
          </p>
          <q-separator spaced style="width: 300px" />

          <p class="text-h6">
            <q-icon size="md" name="call" />{{ user.phone }}
          </p>
          <q-separator spaced style="width: 300px" />

          <p class="text-h6">
            <q-icon size="md" name="facebook" />{{ user.facebook }}
          </p>
          <q-separator spaced style="width: 300px" />

          <p class="text-h6"><q-icon size="md" name="code" />{{ user.git }}</p>
        </q-card-section>
        <q-separator spaced />
      </q-card>
    </div>
  </div>
</template>

<script>
//import chip from "../components/Chip";
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
    //chip,
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
  /* display: grid; */
  display: flex;
  justify-content: center;
  height: 11rem;
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
  /* height: 180px; */
}

.q-separator {
  margin: 0 auto;
}

.section {
  padding: 7px;
}

.inner-card {
  width: 100%;
  max-width: 250px;
  height: 270px;
}

.edt-btn {
  position: absolute;
  top: 105px;
  z-index: 100;
  margin-left: 80px;
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
.profile-info {
  margin-top: 2%;
  justify-content: center;
  text-align: center;
}
.q-chip {
  padding: 7px 12px;
  width: 300px;
  text-align: center;
  /* width: fit-content; */
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

.my-card {
  width: 100%;
  max-width: 800px;
}

@media only screen and (max-width: 600px) {
  .particles {
    display: none;
  }

  .account-info {
    width: 100%;
  }
}
</style>
