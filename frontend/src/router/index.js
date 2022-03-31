import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  },
  {
    path: '/coworker',
    name: 'coworker',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoworkerView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
