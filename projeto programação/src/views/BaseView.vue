<script setup>
console.log("sup")
var visible = false

import { onMounted } from 'vue'

// colocar todos os elementos de DOM dentro de onMounted
onMounted(() => {
  const LogBTN = document.getElementById("Log")
  const loginScreen= document.getElementById("logbox")
 
	window.addEventListener('click', function(e){   
		if (document.getElementById('logbox').contains(e.target)){
			// Clicked in box
			console.log("inside")
		} else{
			console.log("outside")
			loginScreen.classList.toggle("invisible")
		}
		});


  LogBTN.addEventListener("click", function() {
    console.log("login")
	loginScreen.classList.toggle("invisible")
	})
  

})

window.addEventListener('scroll', function () {
  const navbar = document.querySelector("#navbar nav");
  const loginBtn = document.querySelector(".login-btn");

  if (window.scrollY > 100) {
    navbar.classList.add("navbar-branco");
    loginBtn.classList.add("text-danger");
    loginBtn.classList.remove("text-white");
  } else {
    navbar.classList.remove("navbar-branco");
    loginBtn.classList.remove("text-danger");
    loginBtn.classList.add("text-white");
  }
});


function showRegister() {
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('registerScreen').classList.remove('d-none');
}

window.showRegister = showRegister
function showLogin() {
	console.log("click")
  document.getElementById('registerScreen').classList.add('d-none');
  document.getElementById('loginScreen').classList.remove('d-none');
}
window.showLogin = showLogin;

</script>

<template>
  <nav>
		<a href="#">Princípio</a>
		<router-link to="/Dis">Disciplinas</router-link>
		<a href="#">Calendário</a>
		<!-- updated attributes to use Bootstrap's modal trigger -->
		<button id="Log">Login</button>
	</nav>

  <div class="login-box , invisible" id="logbox">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content border-danger border-2 rounded-4">

				<!-- Ecrã 1: Login -->
				<div id="loginScreen" class="p-4">
					<div class="text-center mb-4">
						<a color="red">TRACKER</a>
					</div>
					<div class="mb-2">
						<input type="text" id="username" class="form-control text-center rounded-pill"
							placeholder="Nome de Utilizador">
					</div>
					<div class="mb-3">
						<input type="password" id="password" class="form-control text-center rounded-pill"
							placeholder="Palavra-passe">
					</div>
					<button id="btnLogin" class="btn btn-primary w-100 rounded-pill mb-2">Login</button>
					<button class="btn btn-primary w-100 rounded-pill mb-3" onclick="showRegister()">Criar
						conta</button>
				</div>

      <!-- Ecrã 2: Registo -->
      <div id="registerScreen" class="p-4 d-none">
        <button class="btn btn-link p-0 mb-3" onclick="showLogin()">← Voltar</button>
        <div class="text-center mb-4">
          <a>TRACKER</a>
        </div>

					<div class="mb-2"><input type="text" class="form-control text-center rounded-pill"
							placeholder="Nome de Utilizador"></div>
					<div class="mb-2"><input type="email" class="form-control text-center rounded-pill"
							placeholder="E-mail"></div>
					<div class="mb-2"><input type="email" class="form-control text-center rounded-pill"
							placeholder="Confirmar E-mail"></div>
					<div class="mb-2"><input type="password" class="form-control text-center rounded-pill"
							placeholder="Palavra-passe"></div>
					<div class="mb-3"><input type="password" class="form-control text-center rounded-pill"
							placeholder="Confirmar Palavra-passe"></div>

					<div class="form-check text-start mb-2 small">
						<input class="form-check-input" type="checkbox" id="terms">
						<label class="form-check-label" for="terms">
							Ao criar conta, confirma que tem 18 anos ou mais e aceita os <a href="#">Termos</a> e a <a
								href="#">Política</a>.
						</label>
					</div>

					<button class="btn btn-primary w-100 rounded-pill">Criar conta</button>
				</div>

			</div>
		</div>
	</div>
</template>

<style scoped>
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

.login-box{
	width: 50%;
	background-color: #FFF;
	position: fixed;
	left: 25%;
	top:25%;
}

</style>