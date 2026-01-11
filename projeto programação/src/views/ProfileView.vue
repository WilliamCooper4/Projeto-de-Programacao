<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const user = computed(() => auth.user)

// barra de XP animada
const xpBarWidth = computed(() => {
	if (!user.value) return 0
	return user.value.exp % 100
})

function giveXP(amount = 10) {
	if (!user.value) return
	auth.addExp(amount)
}

// apagar conta
async function deleteAccount() {
	await auth.delMyAcc()
	router.push('/')
}

</script>

<template>
	<div class="title">
		<h1>O Seu Perfil</h1>

		<div v-if="user">
			<img :src="user.profilepic" alt="pfp" class="pfp" />

			<p><strong>Email:</strong> {{ user.email }}</p>
			<p><strong>Role:</strong> {{ user.role }}</p>
			<RouterLink to="/admin" v-if="user.role === 'admin'">abrir painel de admin</RouterLink>

			<hr>

			<p><strong>Nível:</strong> {{ user.lvl }}</p>
			<p><strong>Experiência:</strong> {{ user.exp }}</p>

			<!-- barra de XP -->
			<div class="xp-bar-background">
				<div class="xp-bar-fill" :style="{ width: xpBarWidth + '%' }"></div>
			</div>

			<p><strong>Streak:</strong> {{ user.streak }}</p>

			<hr>

			<p><strong>Disciplinas:</strong></p>
			<ul>
				<li v-for="(c, i) in user.classes" :key="i">
					{{ c }}
				</li>
			</ul>

			<hr>

			<button class="login-btn" @click="deleteAccount">
				Apagar Conta
			</button>

			<!-- botão de teste para dar XP -->
			<button class="login-btn mt-2" @click="giveXP(10)">
				Ganhar 10 XP
			</button>
		</div>

		<p v-else>
			Nenhum utilizador com sessão iniciada.
		</p>
	</div>
</template>

<style scoped>
.title {
	text-align: left;
	color: #128;
	margin-top: 2rem;
	margin-left: 5rem;
	max-width: 900px;
}

.pfp {
	max-height: 8rem;
	margin-bottom: 1rem;
}

/* barra XP */
.xp-bar-background {
	width: 40rem;
	max-width: 100%;
	height: 1.5rem;
	background-color: #abf8f0;
	border-radius: 10px;
	margin: 0.5rem 0;
	overflow: hidden;
	outline: #128 solid 0.2em;
}

.xp-bar-fill {
	height: 100%;
	background-color: #47a;
	transition: width 0.5s ease;
}

.login-btn {
	margin-top: 0.5rem;
}

/* responsivo */
@media (max-width: 900px) {
	.title {
		margin-left: 2rem;
		margin-right: 2rem;
	}
}

@media (max-width: 600px) {
	.title {
		margin-left: 1rem;
		margin-right: 1rem;
		text-align: center;
	}

	.pfp {
		max-height: 6rem;
	}

	.xp-bar-background {
		height: 1.2rem;
	}

	.login-btn {
		width: 100%;
	}
}
</style>