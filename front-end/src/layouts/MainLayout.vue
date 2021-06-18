<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <img id="logo" src="../assets/logo-white-plain.png" />
        </q-toolbar-title>

        <q-toggle @input="darkMode" v-model="dark" label="Dark mode" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="dark-mode"
      :breakpoint="767"
      :width="250"
    >
      <q-img
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
        class="avatar-bg"
      >
        <div @click="goToProfile" class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ getUser.fullName }}</div>
          <div>{{ getUser.email }}</div>
        </div>
      </q-img>
      <q-scroll-area
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <q-list>
          <q-item clickable exact to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label v-if="isLead" header class="text-grey-8">
            Team Lead</q-item-label
          >
          <q-item
            style="color: #2d6cb5"
            v-if="isLead"
            clickable
            exact
            to="/team"
          >
            <q-item-section avatar>
              <q-icon name="group_work" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Your Team</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label header class="text-grey-8"> Manage </q-item-label>

          <q-item clickable exact to="/account">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>My Account</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/activity">
            <q-item-section avatar>
              <q-icon name="analytics" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Activity</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/agenda">
            <q-item-section avatar>
              <q-icon name="ion-calendar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Calendar</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/tasks">
            <q-item-section avatar>
              <q-icon name="ion-construct" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tasks</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/gantt">
            <q-item-section avatar>
              <q-icon name="insights" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Planning</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/flow">
            <q-item-section avatar>
              <q-icon name="account_tree" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Draw Flow Chart</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="isManager" clickable exact to="/manager">
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Department Analysis</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="isManager" clickable exact to="/salaries">
            <q-item-section avatar>
              <q-icon name="attach_money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Salaries Data</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header class="text-grey-8"> Contact </q-item-label>

          <q-item clickable exact to="/contacts">
            <q-item-section avatar>
              <q-icon name="ion-people" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Organization</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable exact to="/board">
            <q-item-section avatar>
              <q-icon name="ion-compass" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Board</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header class="text-grey-8"> Account </q-item-label>

          <q-item clickable exact to="/changePass">
            <q-item-section avatar>
              <q-icon name="ion-lock" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Change Password</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="ion-exit" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Axios from "axios";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      dark: false,
      isLead: false,
      isManager: false,
    };
  },
  methods: {
    darkMode: function () {
      this.$q.dark.toggle(this.dark);
    },
    handleLogout: function () {
      Axios.delete("http://localhost:8081/api/user/logout", {
        withCredentials: true,
      })
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "pan_tool",
            message: `See you soon!`,
          });
          this.$q.cookies.remove("cookieLogin");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "error",
            message: `There has been an error. Sorry...`,
          });
        });
    },
    goToProfile() {
      if (this.$router.currentRoute.fullPath !== "/account") {
        this.$router.push("/account");
      }
    },
    ...mapActions([
      "fetchUser",
      "fetchUsers",
      "fetchActivity",
      "fetchCurrentTasks",
      "fetchLeadProject",
      "fetchProjectTasks",
    ]),
  },
  computed: mapGetters(["getUser"]),
  async created() {
    await this.fetchUser();
    const currentUser = this.getUser;
    this.isLead = currentUser.isLead;
    this.isManager = currentUser.isManager;
    if (this.isLead) {
      await this.fetchLeadProject();
      await this.fetchProjectTasks();
    }
  },
  mounted() {},
};
</script>
<style scoped>
.q-item {
  color: inherit;
}

.q-toolbar {
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
}
.avatar-bg {
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
}
#logo {
  width: 40px;
  height: 40px;
  position: relative;
  top: 4px;
}

.bg-transparent:hover {
  cursor: pointer;
}
</style>
