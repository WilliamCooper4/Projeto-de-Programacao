<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useuserlistStore } from './stores/userlist'

var showRegister = ref(false)
const auth = useAuthStore()
const userlist = useuserlistStore()
const isLoginVisible = ref(false)
const email = ref('')
const Cemail = ref('')
const password = ref('')
const Cpassword = ref('')
const error = ref('')


function toggleLogin() {
	isLoginVisible.value = !isLoginVisible.value
	error.value = ''
}

async function doLogin() {
	var UserToLog= false
	try {
		for(let i=0; i<userlist.users.length; i++){
			if(email.value==userlist.users[i].email && password.value==userlist.users[i].password){
				auth.login(userlist.users[i])
				UserToLog= true
			}
		}
		if(!UserToLog){
			throw new Error('Email ou password incorretos.')
		}
	} catch (err) {
		error.value = err.message
	}
}

function logout() {
	auth.logout()
}

function adduser() {
	var fail = false
	try {
		if(!email.value || !password.value || !Cemail.value || !Cpassword.value){ 
			throw new Error('Por favor, preencha todos os campos.')
		}
		else if(password.value != Cpassword.value){
			throw new Error('As senhas não coincidem.')
		}
		
		else if(email.value != Cemail.value){
			throw new Error('Os emails não coincidem.')
		}
		
		for(let i=0; i<userlist.users.length; i++){
			if(email.value==userlist.users[i].email){
				throw new Error('Usuário já existe.')
			}
		}
	
	
	}	
	catch (err) {
		fail = true
		error.value = err.message
	}
	if(!fail){
		console.log('USER ADDED')
		userlist.addUser(email.value, password.value)
		toggleLogin()
	}
}

</script>

<template>
	<nav>
		<router-link to="/">Princípio</router-link>
		<router-link v-if="auth.isLoggedIn" to="/Dis">Disciplinas</router-link>
		<a href="#">Calendário</a>
		<button v-if="!auth.isLoggedIn" class="login-btn" id="Log" @click="toggleLogin" > Login </button>
		<button v-else class="login-btn" id="Log" @click="logout" > Logout </button>

		<span v-if="auth.isLoggedIn" class="me-3">
			Olá, {{ auth.user.name }}
		</span>

		<span v-if="auth.isLoggedIn" class="me-3" @click="userlist.DeleteUser(auth.user); logout();">
			delete acount
		</span>

	</nav>

	<div v-if="isLoginVisible" id="loginScreen">
		<div class="BlackBack" id="Black" @click="toggleLogin"></div>
		<div id="loginForm" class="p-4">
			<div class="text-center mb-4">
				<p>TRACKER</p>
			</div>

			<div class="mb-2">
				<input v-model="email" type="text" id="username" class="form-control text-center rounded-pill" placeholder="Email"/>
			</div>
			<div class="mb-2">
				<input v-if="showRegister" v-model="Cemail" type="text" id="CUserName" class="form-control text-center rounded-pill" placeholder="Confirmar Email"/>
			</div>
			<div class="mb-3">
				<input v-model="password" type="password" class="form-control text-center rounded-pill" placeholder="Senha"/>
			</div>
			<div class="mb-3">
				<input v-if="showRegister" v-model="Cpassword" type="password" id="Cp" class="form-control text-center rounded-pill" placeholder="Confirmar Senha"/>
			</div>

			<p v-if="error" class="text-danger text-center">{{ error }}</p>

			<button v-if="!showRegister" class="btn btn-primary w-100 rounded-pill mb-3" @click="doLogin">Login</button>
			<button v-if="!showRegister" class="btn btn-primary w-100 rounded-pill mb-3" @click="showRegister = true" >Criar Conta</button>
			<button v-if="showRegister" class="btn btn-primary w-100 rounded-pill mb-3" @click="adduser">Criar Conta</button>
			<button v-if="showRegister" class="btn btn-primary w-100 rounded-pill mb-3" @click="showRegister = false" >return</button>
		</div>
	</div>

	<router-view/>
</template>

<style scoped>

.btn-primary {
	background-color: #112288;
}

.btn-primary:hover {
	background-color: #081144;
}

/* limit width of this specific modal to make it appear smaller */
#loginModal .modal-dialog {
	max-width: 420px;
	margin: 1.75rem auto;
}

body {
	margin: 0;
	font-family: "Maiandra GD",Arial, sans-serif;
	background: #bbccff;
}

/* Barra de navegação */
nav {
	background: #47a;
	border-bottom: 0.2rem solid #112288;
	padding: 2rem 3rem;       /* Aumenta altura e espaçamento */
	display: flex;
	gap: 3rem;                /* Mais espaço entre itens */
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;        /* Torna o texto maior */
}

/* Links normais */
nav a {
	text-decoration: none;
	color: #FFF;
	font-weight: bold;
}

/* Botão de Login */
nav a.login-btn {
	background: #fff;
	color: #4477aa;
	padding: 8px 16px;
	border-radius: 6px;
	font-weight: bold;
}

nav a.login-btn:hover {
	background: #eef;
}

/* Hover dos links normais */
nav a:hover:not(.login-btn) {
	text-decoration: underline;
}

#app {
	padding: 20px;
}

@font-face {
	font-family: "Maiandra GD";
	src: url("./MAIAN.ttf") format("truetype");
	font-weight: normal;
	font-style: normal;
}

.side-bar{
    position: fixed;
    top:  6.45rem;
    margin-top: auto;
    background-color: #47a;
    border-right:0.2rem solid #128;
    width: 17%;
    height: 85.85%;
}

.side-bar a{
	color: white;
	text-decoration: none;
	font-size: 1.2rem;
}

.mini-calendar{
    position: relative;
    background-color: white;
    height: 210px;
    width: 210px;
    left: 20px;
}

.calendar-filter{
    position: relative;

    height: 100px;
    width: 210px;
    left: 20px;
    margin-top: 10px;
}

.invisible{
    display: none;
}

.block {
	position: sticky;
	background: #47a;
	border-bottom: 0.2rem solid #112288;
	border-right:0.2rem solid #128;

	padding: 2rem 3rem;       /* Aumenta altura e espaçamento */
	display: flex;
	gap: 3rem;                /* Mais espaço entre itens */
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;        /* Torna o texto maior */
	width: 10.75%;
	top:0;
	height: 6.45rem;
}

.BlackBack {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
	z-index: 999;
	}
#loginForm {
	position: fixed;
	z-index: 1000;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #47a;
	outline: solid #128;
	border-radius: 6px;
}

</style>
