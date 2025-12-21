<script setup>
    import { onMounted } from 'vue'
    onMounted(() => {

    })
</script>


<template>
	<div class="BlackBack" id="Black"></div>
    <div id="loginScreen" class="p-4">
				<div class="text-center mb-4">
					<a color="red">TRACKER</a>
				</div>
				<div class="mb-2">
					<input type="text" id="username" class="form-control text-center rounded-pill" placeholder="Nome de Utilizador">
				</div>
				<div class="mb-3">
					<input type="password" id="password" class="form-control text-center rounded-pill" placeholder="Palavra-passe">
				</div>
		<button id="btnLogin" class="btn btn-primary w-100 rounded-pill mb-2">Login</button>
		<button class="btn btn-primary w-100 rounded-pill mb-3" onclick="showRegister()">CriarConta</button>
	</div>
	
</template>


<style>
.BlackBack {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
	z-index: 999;
	}
#loginScreen {
	position: fixed;
	z-index: 1000;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	}
</style>