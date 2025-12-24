<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const user = computed(() => auth.user)

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

			<hr>

			<p><strong>Nível:</strong> {{ user.lvl }}</p>
			<p><strong>Experiência:</strong> {{ user.exp }}</p>
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
}

.pfp {
	max-height: 8rem;
}
</style>