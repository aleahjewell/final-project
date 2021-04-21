<template>
  <div class="my-pets">
    <h1>{{ owner }}'s Pets</h1>

    <button class="pure-button" @click="toggleUpload">Add New Pet</button>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
    <pet-gallery :pets="pets" />
  </div>
</template>

<script>
import axios from "axios";
import Uploader from "@/components/Uploader.vue";
import PetGallery from "@/components/PetGallery.vue";

export default {
  name: "MyPets",
  components: {
    Uploader,
    PetGallery,
  },
  data() {
    return {
      show: false,
      pets: [],
    };
  },
  created() {
    this.getPets();
  },
  computed: {
    owner() {
      return (
        this.$root.$data.user.firstName + " " + this.$root.$data.user.lastName
      );
    },
  },
  methods: {
    async getPets() {
      try {
        this.response = await axios.get("/api/pets");
        this.pets = this.response.data;
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPets();
    },
  },
};
</script>

<style scoped>
.my-pets {
  display: flex;
  flex-direction: column;
}

h1,
h2,
h3,
p {
  text-align: start;
  margin-bottom: 30px;
}

button {
  background-color: #17252a;
  color: #feffff;
  border-radius: 25px;
  margin-right: auto;
  margin-bottom: 20px;
}

@media only screen and (max-width: 767px) {
  h1,
  h2,
  h3,
  p {
    text-align: center;
  }

  button {
    margin: auto;
    margin-bottom: 20px;
  }
}
</style>
