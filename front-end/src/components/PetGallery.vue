<template>
  <div>
    <section class="pet-gallery">
      <div class="pet" v-for="pet in pets" v-bind:key="pet._id">
        <router-link :to="{ name: 'pet', params: { id: pet._id } }">
          <img :src="pet.path" />
          <div class="pet-info">
            <h5>{{ pet.name }}</h5>
            <p>{{ pet.sex }} &#9679; {{ pet.age }}</p>
            <p>{{ pet.breed }}</p>
            <p>{{ formatDate(pet.date) }}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PetGallery",
  props: {
    pets: Array,
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
  },
};
</script>

<style scoped>
/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.pet-gallery {
  column-gap: 1em;
}

.pet {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  background-color: #2b7a78;
  color: #feffff;
  cursor: pointer;
}

.pet a {
  color: #feffff;
  text-decoration: none;
}

.pet img {
  width: 100%;
  border-radius: 25px;
  padding: 10px;
  background-color: #2b7a78;
}

.pet-info {
  background-color: #2b7a78;
  padding: 0 20px 10px 20px;
  text-align: center;
}

.pet-info h5 {
  font-weight: bold;
  background-color: #2b7a78;
  margin-bottom: 16px;
}

.pet-info p {
  background-color: #2b7a78;
  margin-bottom: 8px;
  text-transform: capitalize;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .pet-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .pet-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .pet-gallery {
    column-count: 2;
  }
}
</style>