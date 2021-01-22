<template class="log">
  <div class="flex flex-center page">
    <particles-bg color="#ffffff" num=100 type="cobweb" :canvas="{backgroundColor:'#2E6CB5'}" :bg="true"/>
    <div class="logDiv" style="max-width: 500px">
      <img src="../assets/logo.png" class="login-icon-container" />
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="login-page-input-container"
      >
        <q-input
          filled
          v-model="email"
          type="email"
          label="Email"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Cannot be empty',
            val =>
              (val &&
                val.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) ||
              'Invalid email'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email"></q-icon>
          </template>
        </q-input>

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
        >
          <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
          </template>
        </q-input>
        <q-toggle v-model="accept" label="Remember me" />

        <div class="btns">
          <q-btn label="Login" type="submit" color="primary" />
          <p id="sign-up">Not a Flow member? <a href="http://localhost:8080/#/register">Sign up here.</a></p>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import {ParticlesBg} from 'particles-bg-vue'
export default {
  data() {
    return {
      email: null,
      password: null,
      accept: false
    };
  },
   components:{
      ParticlesBg
  },

  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
        this.$router.push("/");
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    clicked() {
      alert("test");
    }
  },
  created() {
    this.$q.dark.set(false);
  }
};
</script>
<style scoped>
.logDiv {
  background-color: white;
  text-align: center;
  padding: 50px 70px;
  border-radius: 5px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  margin-top: 2%;
}

.btns {
  text-align: center;
}

/* .page {
   background-color: white; 
  background-image: linear-gradient(to right bottom, #2d6cb5, #1a154c);
  height: 100vh;
}
*/

.q-input {
  width: 300px;
  height: 80px;
  margin: 10px;
}

.login-page-input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#sign-up{
  margin-top: 10px;
}

.canvas{
  background-image: linear-gradient(to right bottom, #2d6cb5, #1a154c);
}

@media only screen and (max-width: 600px) {
  .q-page {
    background-image: none;
    background-color: white;
  }
  .logDiv {
    background-color: white;
    padding: 0;
    width:100vh;
    height: 100vh;
    border-radius: 0px;
    box-shadow: none;
  }
  .q-input {
    width: 260px;
    height: 80px;
    margin: 10px;
  }
  .login-icon-container {
    width: 200px;
  }

  .canvas{
      display: none;
  }
 
}
</style>
