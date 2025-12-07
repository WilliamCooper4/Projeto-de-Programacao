<script setup>
import "../assets/Disciplina.css"
import { onMounted } from 'vue'
    onMounted(() => {
    const LogBTN = document.getElementById("Log")
    const loginScreen= document.getElementById("logbox")
        // deteta se o click é dentrovda da logbox
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
  <main>
    	<!-- barra superior -->
	<nav>
		<a href="#">Princípio</a>
		<router-link to="/Dis">Disciplinas</router-link>
		<a href="#">Calendário</a>
		<!-- updated attributes to use Bootstrap's modal trigger -->
		<button id="Log">Login</button>
	</nav>
    <div class="block" id="sidebar0"><p>SIDE BAR</p></div>
    <div class="page-content">
        <h1 id="name">Disciplina</h1>
        <p id="desc" >Descrição da disciplina</p>
        <p class="invisible" id="test3"><br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>  <br> <br> <br> <br> <br> </p>
        <h2 id="ex">Exercicios</h2>
        <p id="execise"></p>
        <p class="invisible" id="test4"><br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br></p>
        <h2 id="mat">Material de Estudo</h2>
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
        </ul>
    </div>
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
    <div class="test1"><button  id="testbtn">test</button> <!-- botão de teste para sidebar remover depois -->
    <button id="testbtn2">test2</button></div>
    <div class="minisidebar"></div>
    <div class="side-bar" id="sidebar">
        <p>side bar</p>
        <!--<div class="mini-calendar">

            <p class="black-text"> <br> <br>Placeholder calendar</p>
        </div>-->

        <div class="calendar-filter">
            <h3>Conteúdo</h3>
            <ul>
                <li><a href="#name">Descrição</a></li>
                <li><a href="#ex">Exercícios</a></li>
                <li><a href="#mat">Materiais</a></li>
            </ul>
        </div>
    </div>

  </main>
</template>

<style>
</style>
