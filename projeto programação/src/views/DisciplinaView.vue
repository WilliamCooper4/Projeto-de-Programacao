<script setup>
import "../assets/Disciplina.css"
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClassesStore } from '@/stores/classes'

const auth = useAuthStore()
const classesStore = useClassesStore()

onMounted(async () => {
	await classesStore.fetchClasses()
})

// classes do utilizador -> objetos
const userClasses = computed(() => {
	if (!auth.user) return []
	return auth.user.classes
		.map(name => classesStore.getClassByName(name))
		.filter(Boolean) // remove se não existir
})

// disciplina 1 selecionada por deferencia
const selectedClass = ref(userClasses.value[0] || 0)

function selectClass(cls) {
	selectedClass.value = cls
}
</script>

<template>
	<main>
		<div class="page-layout">

			<!-- sidebar -->
			<aside class="side-bar">
				<h3>Disciplinas</h3>
				<ul>
					<li
						v-for="cls in userClasses"
						:key="cls.id"
						@click="selectClass(cls)"
					>
						{{ cls.name }}
					</li>
				</ul>
			</aside>

			<!-- conteudo da disciplina -->
			<div class="page-content" v-if="selectedClass">
				<h1>{{ selectedClass.name }}</h1>
				<p>{{ selectedClass.description }}</p>

				<h2>Exercícios</h2>
				<ul>
					<li v-for="ex in selectedClass.exercises" :key="ex.id">
						<a :href="ex.link" target="_blank">{{ ex.nome }}</a>
					</li>
				</ul>

				<h2>Material de Estudo</h2>
				<ul>
					<li v-for="res in selectedClass.resources" :key="res.id">
						<a :href="res.link" target="_blank">{{ res.nome }}</a>
					</li>
				</ul>
			</div>
		</div>
	</main>
</template>

<style scoped>
.page-layout {
	display: flex;
	align-items: flex-start;
	margin-top: 6.45rem; /* altura navbar */
}

.page-content {
	flex: 1;
	padding: 1rem;
}

.side-bar {
	width: 17%;
	background-color: #47a;
	border-right: 0.2rem solid #128;
	padding: 1rem;
}

.side-bar ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.side-bar ul li {
	padding: 0.5rem 0.8rem;
	cursor: pointer;
	color: white;
	transition: background 0.2s;
	background-color: transparent; /* cor padrão */
}

.side-bar ul li:hover {
	background-color: #128;
}
</style>