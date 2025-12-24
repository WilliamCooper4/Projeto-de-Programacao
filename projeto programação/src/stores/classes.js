import { defineStore } from 'pinia'
import { get } from '@/api/api'

export const useClassesStore = defineStore('classes', {
	state: () => ({
		classes: []
	}),
	actions: {
		async fetchClasses() {
			try {
				const data = await get('/classes')
				this.classes = data
			} catch (err) {
				console.error('Erro ao buscar classes:', err)
			}
		},
		// opcional: buscar por nome ou id
		getClassByName(name) {
			return this.classes.find(c => c.name === name)
		},
		getClassById(id) {
			return this.classes.find(c => c.id === id)
		}
	}
})
