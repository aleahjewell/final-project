<template>
  <div class="my-messages">
    <h1>{{ owner }}'s Messages</h1>

    <div class="message" v-for="message in messages" v-bind:key="message._id">
      <img :src="message.pet.path" />
      <div class="message-body">
        <p><span class="label">Name:</span>{{ message.name }}</p>
        <p><span class="label">Email:</span>{{ message.email }}</p>
        <p><span class="label">Phone:</span>{{ message.phone }}</p>
        <p><span class="label">Message:</span>{{ message.message }}</p>
      </div>
      <div class="message-data">
        <p class="date">{{ formatDate(message.date) }}</p>
        <button class="pure-button" @click="deleteMessage(message)">
          Delete
        </button>
      </div>
    </div>

    <p v-show="messages.length == 0">You have no messages.</p>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "MyMessages",
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.getMessages();
  },
  computed: {
    owner() {
      return (
        this.$root.$data.user.firstName + " " + this.$root.$data.user.lastName
      );
    },
  },
  methods: {
    async getMessages() {
      try {
        this.response = await axios.get(
          "/api/messages/" + this.$root.$data.user._id
        );
        this.messages = this.response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMessage(message) {
      try {
        await axios.delete("/api/messages/" + message._id);
        this.getMessages();
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
  },
};
</script>

<style scoped>
.my-messages {
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #17252a;
  padding: 20px 0;
}

.message-body {
  margin-left: 30px;
  width: 100%;
}

.message-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  width: 200px;
  height: fit-content;
}

h1,
h2,
h3,
p {
  text-align: start;
  margin-bottom: 30px;
}

p {
  font-size: 14pt;
  color: #feffff;
}

.date {
  font-size: 11pt;
  width: max-content;
}

.label {
  font-weight: bold;
  padding-right: 10px;
}

button {
  background-color: #17252a;
  color: #feffff;
  border-radius: 25px;
  margin: auto;
  margin-bottom: 0;
}

@media only screen and (max-width: 767px) {
  h1,
  h2,
  h3,
  p {
    text-align: center;
  }

  .message {
    flex-direction: column;
    align-items: center;
  }

  img {
    margin-bottom: 30px;
  }

  .message-body {
    margin-left: 0;
    margin-bottom: 30px;
  }

  button {
    margin: auto;
    margin-bottom: 20px;
  }
}
</style>
