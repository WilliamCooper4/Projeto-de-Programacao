import BaseView from '@/views/BaseView.vue'
import DisciplinaView from '@/views/DisciplinaView.vue'
import ProfileView from '@/views/ProfileView.vue'
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
		},
		{
			path: "/User",
			name: "Utilizador",
			component: ProfileView
		},
		{
			path: "/login",
			name: "login",
			component: () => import('@/views/LoginView.vue')
		},
		{
			path: "/admin",
			name: "admin",
			component: () => import('@/views/adminview.vue')
		}
		
	],
})

export default router
