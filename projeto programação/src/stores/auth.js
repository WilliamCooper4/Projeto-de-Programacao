import { defineStore } from 'pinia'
import { useUsersStore } from './users'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		isLoggedIn: false
	}),

	actions: {
		login(USER) {
			this.user = USER
			this.isLoggedIn = true
		},

		logout() {
			this.user = null
			this.isLoggedIn = false
		},

		async delMyAcc() {
			if (!this.user) return

			const usersStore = useUsersStore()
			await usersStore.deleteUser(this.user.id)

			this.logout()
		}
	}
})