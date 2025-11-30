import BaseView from '@/views/BaseView.vue'
import DisciplinaView from '@/views/DisciplinaView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: BaseView
    },

    {
      path: "/Dis",
      name: "Disciplina",
      component: DisciplinaView
    }
  ],
})

export default router

