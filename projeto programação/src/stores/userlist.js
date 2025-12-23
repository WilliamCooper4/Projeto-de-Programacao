import { defineStore } from 'pinia'
import { get } from '@/api/api'
var data = import('../db.json')

export const UserlistStore = defineStore('userlist', {
    state: () => ({
        users: [
		{
			id: 1,
			name: "administrador",
			email: "myemail@gmail.com",
			password: "password",
			role: "admin",
			profilepic: "image",
			classes: [
				"Computação Gráfica",
				"Programação Web",
				"Bases de Dados"
			],
			lvl: 1,
			exp: 0,
			streak: 0,
			lembretes: [
			],

			eventosCalendario: [
				{ "id": 1, titulo: "Aula de Química", data: 2763310419 },
				{ "id": 2, titulo: "Apresentação", data: 2767316419 }
			]
		},
		{
			id: 2,
			name: "utilizador",
			email:"123@esmad.ipp.pt",
			password: "1234",
			role: "user",
			profilepic: "image",
			classes: [
				"Sistemas Computacionais",
				"Programação Web",
				"Inteligência Artificial"
			],
			lvl: 1,
			exp: 0,
			streak: 0,
			lembretes: [
				{ id: 1, texto: "Estudar para o teste de Matemática", data: 1763310419 },
				{ id: 2, texto: "Enviar trabalho de Português", data: 1763297999 }
			],

			eventosCalendario: [
				{ id: 1, titulo: "Apresentação", data: 2767316419 }
			]
		}
	],
    }),

    actions: {
        async addUser(email, password) {
            this.users.push({
                id: this.users.length + 1,
                name: "newuser",
                email: email,
                password: password,
                role: "user",
                profilepic: "image",
                classes: [],
                lvl: 1,
                exp: 0,
                streak: 0,
                lembretes: [],
                eventosCalendario: []
            })
        },

        DeleteUser(USER) {
			console.log('DeleteUser called with:', USER)
  			console.log('Before:', this.users.map(u => u.email))
			this.users =this.users.filter(user => user.email != USER.email)
			console.log('After:', this.users.map(u => u.email))
        }
    }}
)