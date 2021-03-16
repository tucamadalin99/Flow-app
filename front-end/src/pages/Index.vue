<template>
  <q-page class="q-pa-md">
    <!-- <img alt="Flow logo" src="~assets/logo.png" /> -->
    <particles-bg
      color="#2d6cb5"
      num="80"
      type="cobweb"
      class="particles"
      :canvas="{ backgroundColor: '#fffff' }"
      :bg="true"
    />
    <div class="logo row">
      <img alt="Flow logo" src="~assets/logo.png" />
    </div>

    <div class="q-gutter-md carousel">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="text-white shadow-1 rounded-borders carousel-element"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  name: "PageIndex",
  components: { ParticlesBg },
  data() {
    return {
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
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
.logo {
  display: flex;
  margin-top: 10vh;
  justify-content: center;
}
.carousel {
  display: flex;
  justify-content: center;
  margin-top: 20vh;
}

.carousel-element {
  background-image: linear-gradient(to right bottom, #2d6cb5, #1a154c);
}
@media only screen and (max-width: 600px) {
  .particles {
    display: none;
  }
  .carousel {
    margin-top: 10vh;
  }
}
</style>
