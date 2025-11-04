import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import WhatIsGego from '../views/WhatIsGego.vue'

const router = createRouter({
  history: createWebHistory('/gego-analytics/'),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/what-is-gego',
      name: 'what-is-gego',
      component: WhatIsGego
    }
  ]
})

export default router

