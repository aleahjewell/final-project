<template>
  <div class="hero">
    <div class="heroBox">
      <form class="pure-form">
        <fieldset>
          <legend>Register for an account</legend>
          <input placeholder="First name" v-model="firstName" />
          <input placeholder="Last name" v-model="lastName" />
        </fieldset>
        <fieldset>
          <input placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
        </fieldset>
        <fieldset>
          <button
            type="submit"
            class="pure-button pure-button-primary"
            @click.prevent="register"
          >
            Register
          </button>
        </fieldset>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <form class="pure-form space-above">
        <fieldset>
          <legend>Login</legend>
          <input placeholder="Username" v-model="usernameLogin" />
          <input
            type="password"
            placeholder="Password"
            v-model="passwordLogin"
          />
        </fieldset>
        <fieldset>
          <button
            type="submit"
            class="pure-button pure-button-primary"
            @click.prevent="login"
          >
            Login
          </button>
        </fieldset>
      </form>
      <p v-if="errorLogin" class="error">{{ errorLogin }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: "",
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post("/api/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = "";
      this.errorLogin = "";
      if (!this.usernameLogin || !this.passwordLogin) return;
      try {
        let response = await axios.post("/api/users/login", {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 120px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
  color: #17252a;
}

.hero form legend {
  color: #17252a;
  font-size: 20px;
}

input {
  margin-right: 10px;
  background-color: #feffff;
}

button {
  background-color: #17252a;
  color: #feffff;
  border-radius: 25px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #feffff;
}
</style>
