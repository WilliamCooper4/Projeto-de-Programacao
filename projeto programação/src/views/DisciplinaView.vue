<script setup>
</script>

<template>
  <main>
    	<!-- barra superior -->
	<nav>
		<router-link to="/">Princípio</router-link>
		<a href="#">Disciplinas</a>
		<a href="#">Calendário</a>
		<a href="#" class="login-btn">Login</a>
        
	</nav>
    <div class="block" id="sidebar0"><p>SIDE BAR</p></div>
    <div class="page-content">
        <h1 id="name">Disciplina</h1>
        <p id="desc" >descrição da disciplina</p>
        <p class="invisible" id="test3"><br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>  <br> <br> <br> <br> <br> </p>
        <h2 id="ex">Exercicios</h2>
        <p id="execise"></p>
        <p class="invisible" id="test4"><br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br></p>
        <h2 id="mat">Material de Estudo</h2>
        <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
        </ul>
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
                <li><a href="#name">descrição</a></li>
                <li><a href="#ex">Exercicios</a></li>
                <li><a href="#mat">Materiais</a></li>
            </ul>
        </div>
    </div>

  </main>
</template>
