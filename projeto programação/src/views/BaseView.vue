<script setup>

import { onMounted } from 'vue'


// colocar todos os elementos de DOM dentro de onMounted
onMounted(() => {
  const LogBTN = document.getElementById("Log")
  const loginScreen= document.getElementById("logbox")

	function addLog(){
		LogBTN.removeEventListener("click");
		window.addEventListener('click', function(e){
			if (document.getElementById('logbox').contains(e.target)){
				// Clicked in box
				console.log("inside")
			} else{
				console.log("outside")
				loginScreen.classList.toggle("invisible")
				window.removeEventListener("cli")
				LogBTN.addEventListener("click", function() {
				console.log("login")
				loginScreen.classList.toggle("invisible")
				addLog()
				})
			}
			});
	}
		/*window.addEventListener('click', function(e){
		if (document.getElementById('logbox').contains(e.target)){
			// Clicked in box
			console.log("inside")
		} else{
			console.log("outside")
			loginScreen.classList.toggle("invisible")
		}
		});*/

			LogBTN.addEventListener("click", function() {
			console.log("login")
			loginScreen.classList.toggle("invisible")
			addLog()
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
	<h1>THIS IS HOME</h1>
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