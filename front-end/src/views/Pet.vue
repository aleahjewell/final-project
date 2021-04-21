<template>
  <div class="pet">
    <h1>{{ name }}</h1>
    <div class="horizontal-container">
      <div class="container-item">
        <img :src="path" />
      </div>
      <div class="container-item">
        <div class="info" v-if="loggedInOwner">
          <form class="pure-form" @submit.prevent="save">
            <h2>Info</h2>
            <fieldset>
              <input v-model="name" />
            </fieldset>
            <fieldset>
              <select v-model="type">
                <option value="" disabled selected hidden>Type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
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
              <select v-model="age">
                <option value="" disabled selected hidden>Age</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="old">Old</option>
              </select>
            </fieldset>
            <fieldset>
              <input v-model="breed" />
            </fieldset>

            <h2>About</h2>
            <fieldset>
              <textarea v-model="description"></textarea>
            </fieldset>
            <fieldset class="buttons">
              <button type="button" @click="deletePet" class="pure-button">
                Delete
              </button>
              <button
                type="submit"
                class="pure-button pure-button-primary right"
              >
                Save
              </button>
            </fieldset>
          </form>
        </div>

        <div class="info" v-else>
          <h2>Info</h2>
          <p class="info-item"><span class="label">Type:</span>{{ type }}</p>
          <p class="info-item"><span class="label">Sex:</span>{{ sex }}</p>
          <p class="info-item"><span class="label">Age:</span>{{ age }}</p>
          <p class="info-item"><span class="label">Breed:</span>{{ breed }}</p>

          <h2>About</h2>
          <p>{{ description }}</p>

          <div class="button-container">
            <button
              v-show="loggedInNotOwner"
              @click="toggleQuestion"
              class="pure-button"
            >
              Ask About {{ name }}
            </button>
            <question
              :show="show"
              :pet="pet"
              @close="close"
              @messageFinished="messageFinished"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Question from "../components/Question.vue";

export default {
  name: "Pet",
  components: {
    Question,
  },
  data() {
    return {
      pet: null,
      show: false,
    };
  },
  async created() {
    this.checkIfLoggedIn();
    this.getPet();
  },
  computed: {
    path() {
      return this.pet ? this.pet.path : "";
    },
    name: {
      get: function () {
        return this.pet ? this.pet.name : "";
      },
      set: function (val) {
        this.pet.name = val;
      },
    },
    type: {
      get: function () {
        return this.pet ? this.pet.type : "";
      },
      set: function (val) {
        this.pet.type = val;
      },
    },
    sex: {
      get: function () {
        return this.pet ? this.pet.sex : "";
      },
      set: function (val) {
        this.pet.sex = val;
      },
    },
    age: {
      get: function () {
        return this.pet ? this.pet.age : "";
      },
      set: function (val) {
        this.pet.age = val;
      },
    },
    breed: {
      get: function () {
        return this.pet ? this.pet.breed : "";
      },
      set: function (val) {
        this.pet.breed = val;
      },
    },
    description: {
      get: function () {
        return this.pet ? this.pet.description : "";
      },
      set: function (val) {
        this.pet.description = val;
      },
    },
    loggedInNotOwner() {
      return (
        this.$root.$data.user &&
        this.pet &&
        this.$root.$data.user._id != this.pet.user._id
      );
    },
    loggedInOwner() {
      return (
        this.$root.$data.user &&
        this.pet &&
        this.$root.$data.user._id == this.pet.user._id
      );
    },
  },
  methods: {
    async checkIfLoggedIn() {
      try {
        let response = await axios.get("/api/users");
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPet() {
      try {
        let response = await axios.get("/api/pets/" + this.$route.params.id);
        this.pet = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      try {
        axios.put("/api/pets/" + this.$route.params.id, {
          name: this.pet.name,
          type: this.pet.type,
          age: this.pet.age,
          sex: this.pet.sex,
          breed: this.pet.breed,
          description: this.pet.description,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletePet() {
      try {
        axios.delete("/api/pets/" + this.$route.params.id);
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.show = false;
    },
    toggleQuestion() {
      this.show = true;
    },
    async messageFinished() {
      this.show = false;
    },
  },
};
</script>


<style scoped>
.pet {
  padding: 50px;
}

.horizontal-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}

.container-item {
  display: flex;
  flex-basis: 100%;
}

img {
  width: 100%;
  padding-right: 20px;
  height: fit-content;
}

.info {
  padding-left: 20px;
  width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: start;
  color: #feffff;
  margin-bottom: 15px;
}

h1 {
  margin-bottom: 25px;
}

p {
  text-align: start;
  color: #17252a;
  margin-bottom: 15px;
  font-size: 14pt;
}

.label {
  font-weight: bold;
  padding-right: 10px;
}

.info-item {
  text-transform: capitalize;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
}

button {
  background-color: #17252a;
  color: #feffff;
  border-radius: 25px;
}

form {
  font-size: 11pt;
}

form legend {
  color: #17252a;
}

input {
  background-color: #feffff;
  width: 100%;
  color: #17252a;
  margin-bottom: 15px;
}

input::placeholder {
  color: #17252a;
}

textarea {
  width: 100%;
  height: 100px;
  background-color: #feffff;
  margin-bottom: 15px;
}

textarea::placeholder {
  color: #17252a;
}

select {
  padding: 5px 10px;
  width: 100%;
  background-color: #feffff;
  color: #17252a;
  margin-bottom: 15px;
}

option {
  background-color: #feffff;
  color: #17252a;
}

fieldset {
  display: flex;
  flex-direction: row;
  width: 100%;
}

label {
  font-weight: bold;
  padding-right: 10px;
}

@media only screen and (max-width: 767px) {
  .horizontal-container {
    flex-direction: column;
  }

  .button-container {
    justify-content: center;
  }

  .container-item {
    margin-bottom: 15px;
  }

  img {
    padding: 0;
  }

  .info {
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-align: center;
  }

  .pure-form button[type="submit"] {
    margin: 0 !important;
  }
}
</style>
