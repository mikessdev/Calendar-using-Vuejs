import { createRouter, createWebHistory } from 'vue-router'
import EmployeeProfile from '@/page/EmployeeProfile.vue'

const routes = [];

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: EmployeeProfile },
    ]
  })

export default router
