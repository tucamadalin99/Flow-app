<template>
  <q-page class="flex flex-center">
    <img alt="Flow logo" src="~assets/logo.png" />
    <particles-bg
      color="#2d6cb5"
      num="80"
      type="cobweb"
      :canvas="{ backgroundColor: '#fffff' }"
      :bg="true"
    />
  </q-page>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  name: "PageIndex",
  components: { ParticlesBg },
  methods: {
    ...mapActions(["fetchUser", "fetchUsers"]),
  },

  created() {
    // this.fetchUser();
    // this.fetchUsers();
  },
};
</script>
<style scoped>
</style>
