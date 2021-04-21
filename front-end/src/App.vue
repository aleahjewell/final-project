<template>
  <div id="app">
    <div class="page-wrap">
      <div class="content-wrap">
        <navbar />
        <router-view />
      </div>
      <div class="footer">
        <a href="https://github.com/aleahjewell/final-project">
          GitHub Repository ~10 hours
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>


<style>
* {
  box-sizing: border-box;
  background-color: #3aafa9;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #17252a;
  height: 100%;
}

.page-wrap {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
  margin-bottom: 0;
}

.footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer a {
  color: #17252a;
  text-decoration: none;
}

.footer a:hover {
  color: #17252a;
  text-decoration: underline;
}
</style>
