<template>
  <q-page class="q-pa-md">
    <!-- <img alt="Flow logo" src="~assets/logo.png" /> -->
    <particles-bg
      color="#2d6cb5"
      num="70"
      type="cobweb"
      class="particles"
      :canvas="{ backgroundColor: '#fffff' }"
      :bg="true"
    />
    <div class="rating">
      <q-btn round @click="show" class="rating" color="primary">
        <q-icon name="star"></q-icon>
      </q-btn>
    </div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <!--
        ...content
        ... use q-card-section for it?
      -->
        <q-card-section>
          <div class="q-gutter-y-md column">
            <p class="rating text-body1">
              We are more than thankful for your feedback
            </p>
            <q-rating
              v-model="ratingModel"
              :max="4"
              size="3.5em"
              color="primary"
              class="rating"
              :icon="icons"
            />
          </div>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="logo row">
      <img
        alt="Flow logo"
        src="~assets/logo.png"
        style="width: 150px; height: 150px; margin-top: 0.5%"
      />
    </div>

    <div class="q-pa-md carousel-frame">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders inset-shadow-down carousel"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="accessibility_new" color="primary" size="56px" />
          <div class="q-mt-md text-center text-h6 text-weight-light">
            {{ manage }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="track_changes" color="primary" size="56px" />
          <div class="q-mt-md text-center text-h6 text-weight-light">
            {{ active }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="perm_contact_calendar" color="primary" size="56px" />
          <div class="q-mt-md text-center text-h6 text-weight-light">
            {{ contacts }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="flag" color="primary" size="56px" />
          <div class="q-mt-md text-center text-h6 text-weight-light">
            {{ lead }}
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[
            { label: 1, value: 'style' },
            { label: 2, value: 'tv' },
            { label: 3, value: 'layers' },
            { label: 4, value: 'map' },
          ]"
        />
      </div>
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
      ratingModel: 3,
      icons: [
        "sentiment_very_dissatisfied",
        "sentiment_dissatisfied",
        "sentiment_satisfied",
        "sentiment_very_satisfied",
      ],
      slide: "style",
      manage:
        "Manage your company effictively, having access to a wide array of special functionalities. Plan, evaluate and set the bar high for your goal.",
      active:
        "Be active and up to date to the latest tasks in your organization. Track the progress made and the target set for the projects",
      contacts:
        "Tired of countless messages when you need to contact a member? You can easily find all the necessary contact data for each member of your organization.",
      lead:
        "Lead your team in an effective matter and have the latest news about the work of your team",
    };
  },
  methods: {
    ...mapActions(["fetchUser", "fetchUsers"]),
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    },
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
  margin-top: -1vh;
  justify-content: center;
}
.carousel {
  background-color: #00000000;
}

.carousel-element {
  background-image: linear-gradient(to right bottom, #2d6cb5, #1a154c);
}

.rating {
  display: flex;
  justify-content: flex-end;
}
@media only screen and (max-width: 600px) {
  .particles {
    display: none;
  }
  .carousel {
    /* margin-top: 10vh; */
    box-shadow: 1px black;
  }
}
</style>
