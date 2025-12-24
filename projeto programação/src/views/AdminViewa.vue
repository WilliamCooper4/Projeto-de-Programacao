<script setup>
import { onMounted, computed} from 'vue'
import { useUsersStore } from '@/stores/users'
import { useClassesStore } from '@/stores/classes'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)

const classesStore = useClassesStore()
const usersStore = useUsersStore()

onMounted(() => {
	usersStore.fetchUsers()
	classesStore.fetchClasses()
})
</script>

<template>
	<body>
		<div v-if="user && user.role === 'admin'">
			<div class="title">
				<h1>Painel de Admin</h1>
			</div>
			<h2>Lista de Utilizadores</h2>
			<div class="scrolllist" id="userlist">
				<ul>
					<p v-for="(c, i) in usersStore.users" :key="i">
						{{ c.id }}: {{ c.email }}, {{ c.role }}
					</p>
				</ul>
			</div>
			<h2>Lista de Disciplinas</h2>
			<div class="scrolllist" id="classlist">
				<ul>
					<p v-for="(c, i) in classesStore.classes" :key="i">
						{{ c.id }}: {{ c.name }}
					</p>
				</ul>
			</div>
		</div>
		<div v-else class="title">
			<h1>É preciso ser administrador para ver esta página.</h1>
		</div>
	</body>
</template>

<style scoped>
body {
	color: black;
}

.scrolllist {
	border: 1px solid black;
	padding: 10px;
	margin-bottom: 20px;
	background-color: #f9f9f9;
	height: 10rem;
	overflow-y: scroll;
}
</style>