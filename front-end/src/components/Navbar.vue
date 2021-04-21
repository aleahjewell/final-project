<template>
  <b-navbar toggleable="md" type="light" variant="info">
    <b-navbar-brand :to="{ name: 'Home' }">Pet Adoption</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'MyPetsControl' }">My Pets</b-nav-item>
        <b-nav-item :to="{ name: 'MyMessagesControl' }">My Messages</b-nav-item>

        <b-nav-item class="last" v-if="user">
          <a @click="logout">Logout</a>
        </b-nav-item>
        <b-nav-item class="last" v-else :to="{ name: 'MyPetsControl' }">
          <a>Login</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style scoped>
* {
  background-color: #feffff;
}

.navbar-nav {
  width: 100%;
}

.bg-info {
  background-color: #feffff !important;
  align-items: baseline;
  padding: 10px 50px;
}

.navbar-light .navbar-brand {
  font-family: "Dela Gothic One", cursive;
  color: #3aafa9 !important;
  font-weight: normal !important;
}

a {
  font-weight: normal;
  color: #17252a !important;
}

a.router-link-exact-active {
  font-weight: bold !important;
}

.last {
  margin-left: auto;
  font-weight: normal !important;
}

@media only screen and (max-width: 767px) {
  .last {
    margin: 0;
  }
}
</style>