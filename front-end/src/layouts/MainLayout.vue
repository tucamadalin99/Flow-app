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
        <div class="absolute-bottom bg-transparent">
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
          <q-item-label header class="text-grey-8"> Manage </q-item-label>
          <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
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

          <q-item clickable exact to="/login">
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainLayout",
  // components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      // essentialLinks: linksData,
      dark: false,
    };
  },
  methods: {
    darkMode: function () {
      this.$q.dark.toggle(this.dark);
    },
    ...mapActions(["fetchUser", "fetchUsers", "fetchActivity"]),
  },
  computed: mapGetters(["getUser"]),
  created() {
    // this.$q.dark.toggle(true);
    this.fetchUser();
    this.fetchUsers();
    this.fetchActivity();
  },
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
</style>
