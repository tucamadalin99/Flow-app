<template class="reg">
  <div class="flex flex-center page">
    <particles-bg
      color="#ffffff"
      num="100"
      type="cobweb"
      :canvas="{ backgroundColor: '#2E6CB5', height: '90rem' }"
      :bg="true"
    />
    <div class="regDiv" style="max-width: 500px">
      <img src="../assets/logo.png" class="login-icon-container" />
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="login-page-input-container"
      >
        <q-input
          ref="name"
          filled
          type="text"
          v-model="name"
          label="Name"
          lazy-rules
          :rules="[nonEmpty, letterOnly]"
        >
          <template v-slot:prepend>
            <q-icon name="looks_one"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="surname"
          filled
          type="text"
          v-model="surname"
          label="Surname"
          lazy-rules
          :rules="[nonEmpty, letterOnly]"
        >
          <template v-slot:prepend>
            <q-icon name="looks_two"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="companie"
          filled
          type="text"
          v-model="companie"
          label="Company"
          lazy-rules
          :rules="[nonEmpty, letterOnly]"
        >
          <template v-slot:prepend>
            <q-icon name="business"></q-icon>
          </template>
        </q-input>

        <q-select
          ref="department"
          @input="populateDivDrop"
          filled
          id="dropdown-dep"
          v-model="department"
          :options="optionsDep"
          label="Department"
          :rules="[nonEmptySelect]"
        >
          <template v-slot:prepend>
            <q-icon name="work"></q-icon>
          </template>
        </q-select>

        <q-select
          ref="division"
          filled
          id="dropdown-div"
          v-model="divizie"
          :options="optionsDiv"
          label="Division"
          lazy-rules
          :rules="[nonEmptySelect]"
        >
          <template v-slot:prepend>
            <q-icon name="view_agenda"></q-icon>
          </template>
        </q-select>

        <q-input
          ref="role"
          filled
          type="text"
          v-model="pozitie"
          label="Role"
          lazy-rules
          :rules="[nonEmpty, letterOnly]"
        >
          <template v-slot:prepend>
            <q-icon name="build"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="email"
          filled
          v-model="email"
          type="email"
          label="Email"
          lazy-rules
          :rules="[
            (val) =>
              (val &&
                val.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) ||
              'Invalid email',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="password"
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[nonEmpty]"
        >
          <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="facebook"
          filled
          type="text"
          v-model="facebook"
          label="Facebook profile"
          lazy-rules
          :rules="[nonEmpty]"
        >
          <template v-slot:prepend>
            <q-icon name="facebook"></q-icon>
          </template>
        </q-input>

        <q-input
          ref="git"
          filled
          type="text"
          v-model="git"
          label="Git"
          lazy-rules
          :rules="[
            () => {
              if (!nonEmpty) this.valid = false;
            },
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="device_hub"></q-icon>
          </template>
        </q-input>

        <div class="btns">
          <q-btn label="Sign up" type="submit" color="primary" />
          <p id="to-login">
            Already a member?
            <a href="http://localhost:8080/#/login"> Go back </a> to login
          </p>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Axios from "axios";
import {
  nonEmpty,
  emailPattern,
  nonEmptySelect,
  letterOnly,
} from "../util/validations";

export default {
  data() {
    return {
      name: null,
      surname: null,
      department: null,
      optionsDep: [
        "Sales",
        "Human Resources",
        "Public Relations",
        "Information Technology",
      ],
      optionsDiv: ["None"],
      companie: null,
      divizie: null,
      pozitie: null,
      facebook: null,
      git: null,
      email: null,
      password: null,
      accept: false,
      valid: true,
    };
  },
  components: {
    ParticlesBg,
  },

  methods: {
    onSubmit() {
      let depId = 0;
      if (this.department === "Sales") depId = 1;
      else if (this.department === "Public Relations") depId = 2;
      else if (this.department === "Human Resources") depId = 3;
      else if (this.department === "Information Technology") depId = 4;
      let user = {
        name: this.name,
        surname: this.surname,
        division: this.divizie,
        role: this.pozitie,
        email: this.email,
        password: this.password,
        facebook: this.facebook,
        git: this.git,
        departmentId: depId,
      };
      const refs = this.$refs;
      refs.name.validate();
      refs.surname.validate();
      refs.division.validate();
      refs.role.validate();
      refs.email.validate();
      refs.password.validate();
      refs.facebook.validate();
      refs.git.validate();
      if (
        refs.name.hasError ||
        refs.surname.hasError ||
        refs.division.hasError ||
        refs.role.hasError ||
        refs.email.hasError ||
        refs.password.hasError ||
        refs.facebook.hasError ||
        refs.git.hasError
      )
        Axios.post("http://localhost:8081/api/user/register", user)
          .then(() => {
            this.$q.notify({
              color: "indigo-8",
              textColor: "white",
              icon: "cloud_done",
              message: "User registered! You may login now",
            });
            this.$router.push("/login");
          })
          .catch((err) => {
            const errValues = Object.values(err.response.data);
            errValues.map((item) => {
              this.$q.notify({
                color: "red-9",
                textColor: "white",
                icon: "error",
                message: item,
              });
            });
          });
    },

    populateDivDrop() {
      if (this.department === "Information Technology")
        this.optionsDiv = ["Front-End", "Back-End", "DevOps"];
      if (this.department === "Human Resources")
        this.optionsDiv = ["Recruitment", "Employee Experience"];
      if (this.department === "Public Relations")
        this.optionsDiv = ["Graphics", "Video", "Advertising"];
      if (this.department === "Sales") this.optionsDiv = ["Sales"];
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    clicked() {
      alert("test");
    },
    nonEmpty,
    emailPattern,
    nonEmptySelect,
    letterOnly,
  },
  created() {
    this.$q.dark.set(false);
  },
};
</script>
<style scoped>
.regDiv {
  margin-top: 10px;
  background-color: white;
  text-align: center;
  padding: 50px 70px;
  border-radius: 5px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
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

#sign-up {
  margin-top: 10px;
}
.q-select {
  margin-top: 10px;
  margin-bottom: 30px;
  width: 300px;
}

.canvas {
  background-image: linear-gradient(to right bottom, #2d6cb5, #1a154c);
}

#to-login {
  padding-top: 10px;
}

@media only screen and (max-width: 600px) {
  .q-page {
    background-image: none;
    background-color: white;
  }
  .regDiv {
    background-color: transparent;
    padding: 0;
    border-radius: 0px;
    box-shadow: none;
  }
  .q-input {
    width: 260px;
    height: 80px;
    margin: 10px;
  }
  .q-select {
    width: 260px;
  }
  .login-icon-container {
    width: 200px;
  }
  .canvas {
    display: none;
  }
}
</style>
