import BaseView from '@/views/BaseView.vue'
import DisciplinaView from '@/views/DisciplinaView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AdminView from '@/views/AdminView.vue'
import CalendarView from '@/views/CalendarView.vue'
import DisciplinaEditView from '@/views/DisciplinaEditView.vue'
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
			path: "/EDis",
			name: "Editar Disciplina",
			component: DisciplinaEditView
		},
		{
			path: "/User",
			name: "Utilizador",
			component: ProfileView
		},
		{
			path: "/admin",
			name: "admin",
			component: AdminView
		},
		{
			path:"/calendar",
			name:"calendar",
			component: CalendarView
		},
	],
})

export default router
