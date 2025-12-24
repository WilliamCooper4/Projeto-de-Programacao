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
		},

		addExp(amount) {
			if (!this.user) return

			this.user.exp += amount

			while (this.user.exp >= 100) {
				this.user.exp -= 100
				this.user.lvl += 1
			}

			// Atualiza no DB.json — envia o objeto completo
			const usersStore = useUsersStore()
			usersStore.updateUser(this.user)
		}
	}
})