import { defineStore } from 'pinia'
import { get, post, put, del } from '@/api/api'

export const useClassesStore = defineStore('classes', {
	state: () => ({
		classes: [],
		loading: false,
		error: null
	}),

	actions: {
		async fetchClasses() {
			this.loading = true
			try {
				this.classes = await get('/classes')
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},

		getClassByName(name) {
			return this.classes.find(c => c.name === name)
		},
		getClassById(id) {
			return this.classes.find(c => c.id === id)
		},

		async addClass(newClass) {
			const created = await post('/classes', newClass)
			this.classes.push(created)
		},

		async updateClass(updatedClass) {
			if (!updatedClass.id) throw new Error('A disciplina precisa de ID')

			try {
				const saved = await put(`/classes/${updatedClass.id}`, updatedClass)
				const index = this.classes.findIndex(c => c.id === updatedClass.id)
				if (index !== -1) this.classes[index] = saved
			} catch (err) {
				this.error = err.message
				console.error(err)
			}
		},

		async deleteClass(id) {
			await del(`/classes/${id}`)
			this.classes = this.classes.filter(c => c.id !== id)
		}
	}
})