import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },                      

  // other routes...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router