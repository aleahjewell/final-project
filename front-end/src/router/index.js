import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyPetsControl from '../views/MyPetsControl.vue'
import Pet from '../views/Pet.vue'
import MyMessagesControl from '../views/MyMessagesControl.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mypets',
    name: 'MyPetsControl',
    component: MyPetsControl
  },
  {
    path: '/pet/:id',
    name: 'pet',
    component: Pet
  },
  {
    path: '/mymessages',
    name: 'MyMessagesControl',
    component: MyMessagesControl
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
