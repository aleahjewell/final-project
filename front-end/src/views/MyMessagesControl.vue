<template>
  <div class="my-messages-control">
    <MyMessages v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import MyMessages from "@/components/MyMessages.vue";
import Login from "@/components/Login.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    MyMessages,
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
.my-messages-control {
  padding: 50px;
}
</style>
