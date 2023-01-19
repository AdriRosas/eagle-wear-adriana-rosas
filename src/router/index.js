import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '../views/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import(/* webpackChunkName: "productos" */ '../views/DashboardView.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
