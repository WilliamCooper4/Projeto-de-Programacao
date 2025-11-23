import { defineStore } from "pinia";

interface UserState {
	name: string;
	email: string;
	loggedIn: boolean;
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		name: "",
		email: "",
		loggedIn: false,
	}),
	getters: {
		isAuthenticated(state: UserState): boolean {
			return state.loggedIn;
		},
	},
	actions: {
		logIn(email: string, name: string) {
			this.email = email;
			this.name = name;
			this.loggedIn = true;
		},
		logOut() {
			this.$reset();
		},
	},
});