<template>
  <div class="home">
    <form class="pure-form">
      <fieldset>
        <input v-model="searchText" placeholder="Search" />
      </fieldset>
      <fieldset>
        <select v-model="type">
          <option value="" disabled selected hidden>Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </fieldset>
      <fieldset>
        <select v-model="age">
          <option value="" disabled selected hidden>Age</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="old">Old</option>
        </select>
      </fieldset>
      <fieldset>
        <select v-model="sex">
          <option value="" disabled selected hidden>Sex</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </fieldset>
      <fieldset>
        <button type="button" @click="clear" class="pure-button">Clear</button>
      </fieldset>
    </form>

    <pet-gallery :pets="pets" />
  </div>
</template>

<script>
import PetGallery from "@/components/PetGallery.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    PetGallery,
  },
  data() {
    return {
      searchText: "",
      type: "",
      age: "",
      sex: "",
      allPets: [],
    };
  },
  created() {
    this.checkIfLoggedIn();
    this.getAllPets();
  },
  computed: {
    pets() {
      let filteredName = this.allPets.filter(
        (pet) =>
          (pet.name
            ? pet.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0
            : false) ||
          (pet.breed
            ? pet.breed.toLowerCase().search(this.searchText.toLowerCase()) >= 0
            : false)
      );
      let filteredType = filteredName.filter((pet) =>
        this.type ? pet.type == this.type : true
      );
      let filteredAge = filteredType.filter((pet) =>
        this.age ? pet.age == this.age : true
      );
      let filteredSex = filteredAge.filter((pet) =>
        this.sex ? pet.sex == this.sex : true
      );
      return filteredSex;
    },
  },
  methods: {
    async checkIfLoggedIn() {
      try {
        let response = await axios.get("/api/users");
        this.$root.$data.user = response.data.user;
      } catch (error) {
        console.log(error);
        this.$root.$data.user = null;
      }
    },
    async getAllPets() {
      try {
        this.response = await axios.get("/api/pets/all");
        this.allPets = this.response.data;
      } catch (error) {
        console.log(error);
      }
    },
    clear() {
      this.searchText = "";
      this.type = "";
      this.age = "";
      this.sex = "";
    },
  },
};
</script>

<style scoped>
.home {
  padding: 50px;
}

form {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 11pt;
  margin-bottom: 30px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  color: #17252a;
}

input::placeholder {
  color: #17252a;
}

select {
  padding: 5px 10px;
  width: 100%;
  height: 100%;
}

option {
  background-color: #feffff;
  color: #17252a;
}

form legend {
  color: #17252a;
}

input {
  font-size: 11pt !important;
  background-color: #feffff;
  width: 100%;
  color: #17252a;
  border: 1px solid #ccc !important;
  -webkit-box-shadow: inset 0 1px 3px #ddd !important;
  box-shadow: inset 0 1px 3px #ddd !important;
  border-radius: 4px !important;
}

fieldset {
  display: flex;
  flex-grow: 1;
  margin-right: 10px;
}

fieldset:last-of-type {
  flex-grow: 0;
}

button {
  background-color: #17252a;
  color: #feffff;
  border-radius: 25px;
}

@media only screen and (max-width: 767px) {
  form {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    justify-content: center;
  }
}
</style>
