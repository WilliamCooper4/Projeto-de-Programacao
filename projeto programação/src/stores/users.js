import { defineStore } from 'pinia'
import { get, post, put, del } from '@/api/api'

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [],
		loading: false,
		error: null
	}),

	actions: {
		async fetchUsers() {
			this.loading = true
			try {
				this.users = await get('/users') //pegar db e guardar cópia
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},

		async addUser(userEmail, userPassword) {
			//o id é criado automaticamente, não é preciso por
			const newUser = {
				email: userEmail,
				password: userPassword,
				role: 'user',
				profilepic: 'image',
				classes: [],
				lvl: 1,
				exp: 0,
				streak: 0,
				lembretes: [],
				eventosCalendario: []
			}
			console.log('USER CREATED')
			const createdUser = await post('/users', newUser) //mandar utilizador novo para a db
			this.users.push(createdUser)
			
		},

		async updateUser(updatedUser) {
			if (!updatedUser.id) throw new Error("O utilizador precisa de ter um ID")

			try {
				const savedUser = await put(`/users/${updatedUser.id}`, updatedUser)
				const index = this.users.findIndex(u => u.id === updatedUser.id)
				if (index !== -1) this.users[index] = savedUser
			} catch (err) {
				this.error = err.message
				console.error(err)
			}
		},

		async deleteUser(id) {
			await del(`/users/${id}`) //apagar da base de dados, esperar que dê
			this.users = this.users.filter(u => u.id !== id) //apagar da cópia local
		}
	}
})