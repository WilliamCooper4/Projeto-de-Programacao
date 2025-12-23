<script setup>
import "../assets/Disciplina.css"
import { onMounted } from 'vue'
onMounted(() => {
	const LogBTN = document.getElementById("Log")
	const loginScreen = document.getElementById("logbox")
	// deteta se o click é dentro da da logbox
	window.addEventListener('click', function (e) {
		if (document.getElementById('logbox').contains(e.target)) {
			// Clicked in box
			console.log("inside")
		} else {
			console.log("outside")
			loginScreen.classList.toggle("invisible")
		}
	});


	LogBTN.addEventListener("click", function () {
		console.log("login")

		loginScreen.classList.toggle("invisible")
	})


})

/*window.addEventListener('scroll', function () {
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
});*/


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
	<main>
		<div class="page-layout">
			<!-- conteudo disciplina -->
			<div class="page-content">
				<h1 id="name">Disciplina</h1>
				<p id="desc">Descrição da disciplina</p>

				<h2 id="ex">Exercícios</h2>
				<p id="exercise"></p>

				<h2 id="mat">Material de Estudo</h2>
				<ul>
					<li><a href="#">Link 1</a></li>
					<li><a href="#">Link 2</a></li>
					<li><a href="#">Link 3</a></li>
				</ul>
			</div>

			<!-- sidebar -->
			<aside class="side-bar">
				<div class="calendar-filter">
					<h3>Conteúdo</h3>
					<ul>
						<li><a href="#name">Descrição</a></li>
						<li><a href="#ex">Exercícios</a></li>
						<li><a href="#mat">Materiais</a></li>
					</ul>
				</div>
			</aside>
		</div>
	</main>
</template>

<style>

.page-layout {
	display: flex;
	align-items: flex-start;
	margin-top: 6.45rem; /* altura da navbar */
}

.page-content {
	flex: 1;
}

.side-bar {
	position: relative;
	margin-top: initial;
	background-color: #47a;
	border-right: 0.2rem solid #128;
	width: 17%;
}
</style>