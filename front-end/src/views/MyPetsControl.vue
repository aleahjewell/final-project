<template>
  <div class="my-pets-control">
    <MyPets v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import MyPets from "@/components/MyPets.vue";
import Login from "@/components/Login.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    MyPets,
    Login,
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
};
</script>

<style scoped>
.my-pets-control {
  padding: 50px;
}
</style>
