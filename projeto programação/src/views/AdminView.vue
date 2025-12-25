<script setup>
import { onMounted, computed, ref} from 'vue'
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

function changeRole(user, newRole) {
	const updatedUser = { ...user, role: newRole }
	usersStore.updateUser(updatedUser)
}

function deleteUser(userId) {
	usersStore.deleteUser(userId)
}

const newClassName = ref('')
const newClassDesc = ref('')

async function createClass() {
	if (!newClassName.value) return

	await classesStore.addClass({
		name: newClassName.value,
		description: newClassDesc.value,
		exercises: [],
		resources: []
	})

	newClassName.value = ''
	newClassDesc.value = ''
}

function deleteClass(id) {
	classesStore.deleteClass(id)
}
</script>

<template>
	<body>
		<div v-if="user && user.role === 'admin'">
			<div class="title">
				<h1>Painel de Admin</h1>
			</div>
			<h2>Lista de Utilizadores</h2>
			<div class="scrolllist">
				<div v-for="u in usersStore.users" :key="u.id" class="admin-row">
					<span class="user-email">{{ u.email }}</span>

					<div class="user-actions">
						<select
							:value="u.role"
							@change="changeRole(u, $event.target.value)"
						>
							<option value="user">user</option>
							<option value="admin">admin</option>
						</select>

						<button @click="deleteUser(u.id)">Apagar</button>
					</div>
				</div>
			</div>
			<h2>Disciplinas</h2>
			<div>
				<input v-model="newClassName" placeholder="Nome da disciplina" />
				<input v-model="newClassDesc" placeholder="Descrição" />
				<button @click="createClass">Criar</button>
			</div>

			<div class="scrolllist">
				<div v-for="c in classesStore.classes" :key="c.id" class="admin-row">
					<span>{{ c.name }}</span>
					<button @click="deleteClass(c.id)">Apagar</button>
				</div>
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

.admin-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem 0;
}

.user-email {
	flex: 1;
	text-align: left;
}

.user-actions {
	display: flex;
	gap: 0.8rem; /* espaço entre role e botão */
	align-items: center;
	justify-content: flex-end;
}
</style>