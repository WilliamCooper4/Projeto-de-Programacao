import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
	state: () => ({
		user: null
	}),

	actions: {
		loadFromLocalStorage() {
			const data = localStorage.getItem("user");
			if (data) {
				this.user = JSON.parse(data);
			}
		},

		saveToLocalStorage() {
			localStorage.setItem("user", JSON.stringify(this.user));
		},

		createUser(payload) {
			this.user = payload;
			this.saveToLocalStorage();
		},

		updateUser(payload) {
			this.user = { ...this.user, ...payload };
			this.saveToLocalStorage();
		},

		deleteUser() {
			this.user = null;
			localStorage.removeItem("user");
		},

		// CRUD para lembretes
		addLembrete(lembrete) {
			this.user.lembretes.push(lembrete);
			this.saveToLocalStorage();
		},

		updateLembrete(id, novo) {
			const i = this.user.lembretes.findIndex(l => l.id === id);
			if (i !== -1) {
				this.user.lembretes[i] = { ...this.user.lembretes[i], ...novo };
				this.saveToLocalStorage();
			}
		},

		removeLembrete(id) {
			this.user.lembretes = this.user.lembretes.filter(l => l.id !== id);
			this.saveToLocalStorage();
		},

		// CRUD para eventos de calendário
		addEvento(evento) {
			this.user.eventosCalendario.push(evento);
			this.saveToLocalStorage();
		},

		updateEvento(id, novo) {
			const i = this.user.eventosCalendario.findIndex(e => e.id === id);
			if (i !== -1) {
				this.user.eventosCalendario[i] = { ...this.user.eventosCalendario[i], ...novo };
				this.saveToLocalStorage();
			}
		},

		removeEvento(id) {
			this.user.eventosCalendario = this.user.eventosCalendario.filter(e => e.id !== id);
			this.saveToLocalStorage();
		},

		// CRUD para disciplinas
		addDisciplina(nome) {
			// impedir duplicados
			if (!this.user.disciplinas.includes(nome)) {
				this.user.disciplinas.push(nome);
				this.saveToLocalStorage();
			}
		},

		updateDisciplina(index, novoNome) {
			if (this.user.disciplinas[index]) {
				this.user.disciplinas[index] = novoNome;
				this.saveToLocalStorage();
			}
		},

		removeDisciplina(nome) {
			this.user.disciplinas = this.user.disciplinas.filter(d => d !== nome);
			this.saveToLocalStorage();
		}
	}
});