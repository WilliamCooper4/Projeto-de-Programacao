<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();

onMounted(() => {
  usersStore.fetchUsers();
});

const auth = useAuthStore();
const isLoginVisible = ref(false);
const showRegister = ref(false);
const email = ref("");
const Cemail = ref("");
const password = ref("");
const Cpassword = ref("");
const error = ref("");

function toggleLogin() {
  isLoginVisible.value = !isLoginVisible.value;
  if (!isLoginVisible.value) resetForm();
  error.value = "";
}

async function doLogin() {
  console.log("TRY LOGIN");
  var UserToLog = false;
  try {
    for (let i = 0; i < usersStore.users.length; i++) {
      console.log("TRY LOGIN2");
      if (
        email.value == usersStore.users[i].email &&
        password.value == usersStore.users[i].password
      ) {
        auth.login(usersStore.users[i]);
        UserToLog = true;
        toggleLogin();
        resetForm();
        isLoginVisible.value = false;
        break;
      }
    }
    if (!UserToLog) {
      throw new Error("Email ou password incorretos.");
    }
  } catch (err) {
    error.value = err.message;
  }
}

function logout() {
  auth.logout();
  resetForm();
  router.push("/"); // redireciona para a página principal
}

async function adduser() {
	let fail = false
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	try {
		if (!email.value || !password.value || !Cemail.value || !Cpassword.value) {
			throw new Error("Por favor, preencha todos os campos.")
		}

		if (!emailRegex.test(email.value)) {
			throw new Error("Email inválido.")
		}

		if (password.value.length < 5) {
			throw new Error("A senha deve ter pelo menos 5 caracteres.")
		}

		if (password.value !== Cpassword.value) {
			throw new Error("As senhas não coincidem.")
		}

		if (email.value !== Cemail.value) {
			throw new Error("Os emails não coincidem.")
		}

		for (let i = 0; i < usersStore.users.length; i++) {
			if (email.value === usersStore.users[i].email) {
				throw new Error("Utilizador já existe.")
			}
		}
	} catch (err) {
		fail = true
		error.value = err.message
	}

	if (!fail) {
		console.log("USER ADDED")
		await usersStore.addUser(email.value, password.value)
		doLogin()
		resetForm()
	}
}

function resetForm() {
  email.value = "";
  Cemail.value = "";
  password.value = "";
  Cpassword.value = "";
  error.value = "";
  showRegister.value = false;
}
</script>

<template>
  <nav>
    <router-link to="/">Princípio</router-link>
    <router-link v-if="auth.isLoggedIn" to="/Dis">Disciplinas</router-link>
    <router-link v-if="auth.isLoggedIn" to="/calendar">Calendário</router-link>
    <router-link v-if="auth.isLoggedIn" to="/User"
      ><img
        :src="auth.user?.profilepic"
        alt="SmallPfp"
        width="50px"
        class="SmallPfp"
      />
      {{ auth.user?.email }}</router-link
    >
    <button
      v-if="!auth.isLoggedIn"
      class="login-btn"
      id="Log"
      @click="toggleLogin"
    >
      Login
    </button>
    <button v-else class="login-btn" id="Log" @click="logout">Logout</button>
  </nav>

  <div v-if="isLoginVisible" id="loginScreen">
    <div class="BlackBack" id="Black" @click="toggleLogin"></div>
    <div id="loginForm" class="p-4">
      <div class="text-center mb-4">
        <p>TRACKER</p>
      </div>

      <div class="mb-2">
        <input
          v-model="email"
          type="text"
          id="username"
          class="form-control text-center rounded-pill"
          placeholder="Email"
        />
      </div>
      <div class="mb-2">
        <input
          v-if="showRegister"
          v-model="Cemail"
          type="text"
          id="CUserName"
          class="form-control text-center rounded-pill"
          placeholder="Confirmar Email"
        />
      </div>
      <div class="mb-3">
        <input
          v-model="password"
          type="password"
          class="form-control text-center rounded-pill"
          placeholder="Senha"
        />
      </div>
      <div class="mb-3">
        <input
          v-if="showRegister"
          v-model="Cpassword"
          type="password"
          id="Cp"
          class="form-control text-center rounded-pill"
          placeholder="Confirmar Senha"
        />
      </div>

      <p v-if="error" class="text-danger text-center">{{ error }}</p>

      <button
        v-if="!showRegister"
        class="btn btn-primary w-100 rounded-pill mb-3"
        @click="doLogin"
      >
        Login
      </button>
      <button
        v-if="!showRegister"
        class="btn btn-secondary w-100 rounded-pill mb-3"
        @click="showRegister = true"
      >
        Criar Conta
      </button>
      <button
        v-if="showRegister"
        class="btn btn-primary w-100 rounded-pill mb-3"
        @click="adduser"
      >
        Criar Conta
      </button>
      <button
        v-if="showRegister"
        class="btn btn-secondary w-100 rounded-pill mb-3"
        @click="showRegister = false"
      >
        Voltar
      </button>
    </div>
  </div>
  <div class="inside-app">
    <router-view />
  </div>
</template>

<style scoped>
.btn-primary {
	background-color: #128;
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
	font-family: "Maiandra GD", Arial, sans-serif;
	background: #bbccff;
}

/* Barra de navegação */
nav {
	background: #47a;
	border-bottom: 0.2rem solid #112288;
	padding: 2rem 3rem;
	display: flex;
	gap: 3rem;
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;
}

/* Links normais */
nav a {
	text-decoration: none;
	color: #fff;
	font-weight: bold;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

/* Hover dos links normais */
nav a:hover:not(.login-btn) {
	text-decoration: underline;
}

.login-btn {
	font-weight: bold;
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

/* Sidebar (outras páginas) */
.side-bar {
	position: fixed;
	top: 6.45rem;
	background-color: #47a;
	border-right: 0.2rem solid #128;
	width: 17%;
	height: 85.85%;
}

.side-bar a {
	color: white;
	text-decoration: none;
	font-size: 1.2rem;
}

.mini-calendar {
	position: relative;
	background-color: white;
	height: 210px;
	width: 210px;
	left: 20px;
}

.calendar-filter {
	position: relative;
	height: 100px;
	width: 210px;
	left: 20px;
	margin-top: 10px;
}

.invisible {
	display: none;
}

.block {
	position: sticky;
	background: #47a;
	border-bottom: 0.2rem solid #112288;
	border-right: 0.2rem solid #128;
	padding: 2rem 3rem;
	display: flex;
	gap: 3rem;
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;
	width: 10.75%;
	top: 0;
	height: 6.45rem;
}

/* Background escuro do modal */
.BlackBack {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}

/* Modal login */
#loginForm {
	position: fixed;
	z-index: 1000;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #47a;
	outline: solid #128;
	border-radius: 6px;
	padding: 1.5rem;
}

/* ========================= */
/* 📱 RESPONSIVO */
/* ========================= */

@media (max-width: 700px) {

	nav {
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1.5rem 1rem;
	}

	/* links de navegação em cima */
	nav a {
		order: 1;
		font-size: 1rem;
	}

	/* perfil (pfp + email) em baixo */
	nav a:last-of-type {
		order: 2;
		width: 100%;
		justify-content: center;
	}

	/* botão login/logout ainda mais em baixo */
	nav button {
		order: 3;
		width: 100%;
		max-width: 220px;
	}

	.SmallPfp {
		width: 32px;
		height: 32px;
	}

	/* sidebar desaparece em mobile (opcional) */
	.side-bar {
		display: none;
	}
}
</style>
