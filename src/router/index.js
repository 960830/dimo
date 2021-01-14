import Vue from 'vue'
import VueRouter from 'vue-router'


import Gy from './Gy'
import Dky from './Dky'
import Gcy from './Gcy'
Vue.use(VueRouter)

const routes = [

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  ...Gy,
  ...Dky,
  ...Gcy

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
