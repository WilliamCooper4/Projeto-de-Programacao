import { defineStore } from 'pinia'
import { get } from '@/api/api'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		isLoggedIn: false
	}),

	actions: {
		async login(email, password) {
			const users = await get(`/users?email=${email}`)

			if (!users.length) {
				throw new Error('Utilizador não encontrado')
			}

			const user = users[0]

			if (user.password !== password) {
				throw new Error('Password incorreta')
			}

			this.user = user
			this.isLoggedIn = true
		},

		logout() {
			this.user = null
			this.isLoggedIn = false
		}
	}
})
