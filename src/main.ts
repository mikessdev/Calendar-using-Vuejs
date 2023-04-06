import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import EmployeeProfile from '@/page/EmployeeProfile.vue'
import App from './App.vue'

import './assets/main.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: EmployeeProfile },
    //   { path: '/employee', component: Employee }
    ]
  })


const app = createApp(App)

app.use(router)
app.mount('#app')