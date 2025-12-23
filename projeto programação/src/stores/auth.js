import { defineStore } from 'pinia'
import { get } from '@/api/api'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		isLoggedIn: false
	}),

	actions: {
		async login(USER) {
			this.user = USER
			this.isLoggedIn = true
		},

		logout() {
			this.user = null
			this.isLoggedIn = false
		}
	}
})
