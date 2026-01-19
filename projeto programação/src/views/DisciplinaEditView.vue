<script setup>
import "../assets/Disciplina.css"
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClassesStore } from '@/stores/classes'
import { useUsersStore } from '@/stores/users'
import "@/api/openlibrary.js"
import { GetBook } from "@/api/openlibrary.js"

const auth = useAuthStore()
const classesStore = useClassesStore()
const usersStore = useUsersStore()

const booksDetails = ref([])
const booksLoading = ref(false)
const newClassName = ref('')
const newClassDesc = ref('')

// Edit modes
const editingExercises = ref(false)
const editingResources = ref(false)
const editingBooks = ref(false)
const newExercise = ref({ nome: '', link: '' })
const newResource = ref({ nome: '', link: '', type: 'doc' })
const newBook = ref('')

onMounted(async () => {
  // existing onMounted work
  await classesStore.fetchClasses();
  await usersStore.fetchUsers();

  // select first class for the user (if any) and load its books
  selectedClass.value = userClasses.value[0] || null
  if (selectedClass.value) await loadBooksForClass(selectedClass.value)
});

async function loadBooksForClass(cls) {
  booksDetails.value = []
  if (!cls || !cls.books || cls.books.length === 0) return
  booksLoading.value = true
  try {
    const results = await Promise.all(cls.books.map(b => GetBook(b)))
    booksDetails.value = results.filter(Boolean)
  } catch (err) {
    console.error('Erro ao carregar livros da disciplina:', err)
  } finally {
    booksLoading.value = false
  }
}

const showClassPicker = ref(false);
const selectedClasses = ref([]);

function openCloseClassPicker() {
  if (!auth.user) return;
  showClassPicker.value = !showClassPicker.value;
  if (showClassPicker.value) selectedClasses.value = [...auth.user.classes];
}

async function saveClasses() {
  if (!auth.user) return;

  auth.user.classes = [...selectedClasses.value];

  // persistir na base de dados
  await usersStore.updateUser(auth.user);

  showClassPicker.value = false;
}

const userClasses = computed(() => {
  if (!auth.user) return [];
  return auth.user.classes
    .map((name) => classesStore.getClassByName(name))
    .filter(Boolean); // remove se não existir
});

const selectedClass = ref(userClasses.value[0] || null);

async function selectClass(cls) {
  selectedClass.value = cls;
  await loadBooksForClass(cls);
}

// xp
function giveXP(amount = 10) {
  if (!auth.user) return;
  auth.addExp(amount);
}

// Edit exercises
function addExercise() {
  if (!selectedClass.value || !newExercise.value.nome || !newExercise.value.link) return
  if (!selectedClass.value.exercises) selectedClass.value.exercises = []
  const id = selectedClass.value.exercises.length > 0 
    ? Math.max(...selectedClass.value.exercises.map(e => e.id)) + 1 
    : 0
  selectedClass.value.exercises.push({
    id,
    nome: newExercise.value.nome,
    link: newExercise.value.link
  })
  saveClass()
  newExercise.value = { nome: '', link: '' }
}

function deleteExercise(id) {
  if (!selectedClass.value) return
  selectedClass.value.exercises = selectedClass.value.exercises.filter(e => e.id !== id)
  saveClass()
}

// Edit resources
function addResource() {
  if (!selectedClass.value || !newResource.value.nome || !newResource.value.link) return
  if (!selectedClass.value.resources) selectedClass.value.resources = []
  const id = selectedClass.value.resources.length > 0 
    ? Math.max(...selectedClass.value.resources.map(r => r.id)) + 1 
    : 0
  selectedClass.value.resources.push({
    id,
    nome: newResource.value.nome,
    link: newResource.value.link,
    type: newResource.value.type
  })
  saveClass()
  newResource.value = { nome: '', link: '', type: 'doc' }
}

function deleteResource(id) {
  if (!selectedClass.value) return
  selectedClass.value.resources = selectedClass.value.resources.filter(r => r.id !== id)
  saveClass()
}

// Edit books
function addBook() {
  if (!selectedClass.value || !newBook.value) return
  if (!selectedClass.value.books) selectedClass.value.books = []
  selectedClass.value.books.push(newBook.value)
  saveClass()
  loadBooksForClass(selectedClass.value)
  newBook.value = ''
}

function deleteBook(index) {
  if (!selectedClass.value) return
  selectedClass.value.books.splice(index, 1)
  saveClass()
  loadBooksForClass(selectedClass.value)
}

async function saveClass() {
  if (!selectedClass.value) return
  await classesStore.updateClass(selectedClass.value)
}

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
  <main>
    <div class="page-layout">
      <!-- sidebar -->
      <aside class="side-bar">
        <h3>Disciplinas</h3>
        <ul style="padding-bottom: 2em">
          <li
            v-for="cls in userClasses"
            :key="cls.id"
            @click="selectClass(cls)"
          >
            {{ cls.name }}
          </li>
        </ul>

        <button
          id="btnLogin"
          class="btn btn-secondary w-100 rounded-pill mb-1"
          @click="openCloseClassPicker"
        >
          Adicionar Disciplinas
        </button>
      </aside>

      <!-- criar disciplinas -->
      <div v-if="showClassPicker" class="modal-back">
        <div class="modal-box">
          <h2 style="text-align: center">Criar Disciplinas</h2>
      <div class="create-class-inputs">
				<input v-model="newClassName" placeholder="Nome da disciplina" />
				<input v-model="newClassDesc" placeholder="Descrição" />
			</div>


          <div class="actions">
          <button class="login-btn" @click="createClass">Criar</button>
          <button class="login-btn" @click="openCloseClassPicker">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <!-- conteudo da disciplina -->
      <div class="page-content" v-if="selectedClass">
        <h1>{{ selectedClass.name }}</h1>
        <p>{{ selectedClass.description }}</p>

        <!-- Exercícios Section -->
        <div class="content-section">
          <div class="section-header">
            <h2>Exercícios</h2>
            <button @click="editingExercises = !editingExercises" class="edit-btn">
              {{ editingExercises ? 'Feito' : 'Editar' }}
            </button>
          </div>
          
          <ul>
            <li v-for="ex in selectedClass.exercises" :key="ex.id" class="list-item">
              <a :href="ex.link" target="_blank" @click.prevent="giveXP(5)">{{ ex.nome }}</a>
              <button v-if="editingExercises" @click="deleteExercise(ex.id)" class="delete-btn">✕</button>
            </li>
          </ul>

          <div v-if="editingExercises" class="add-form">
            <input v-model="newExercise.nome" placeholder="Nome do exercício" />
            <input v-model="newExercise.link" placeholder="URL" />
            <button @click="addExercise" class="add-btn">Adicionar</button>
          </div>
        </div>

        <!-- Material de Estudo Section -->
        <div class="content-section">
          <div class="section-header">
            <h2>Material de Estudo</h2>
            <button @click="editingResources = !editingResources" class="edit-btn">
              {{ editingResources ? 'Feito' : 'Editar' }}
            </button>
          </div>
          
          <ul>
            <li v-for="res in selectedClass.resources" :key="res.id" class="list-item">
              <a :href="res.link" target="_blank" @click.prevent="giveXP(3)">{{ res.nome }}</a>
              <button v-if="editingResources" @click="deleteResource(res.id)" class="delete-btn">✕</button>
            </li>
          </ul>

          <div v-if="editingResources" class="add-form">
            <input v-model="newResource.nome" placeholder="Nome do recurso" />
            <input v-model="newResource.link" placeholder="URL" />
            <select v-model="newResource.type">
              <option value="doc">Documento</option>
              <option value="video">Vídeo</option>
              <option value="link">Link</option>
            </select>
            <button @click="addResource" class="add-btn">Adicionar</button>
          </div>
        </div>

        <!-- Livros Section -->
        <div class="content-section">
          <div class="section-header">
            <h2>Livros</h2>
            <button @click="editingBooks = !editingBooks" class="edit-btn">
              {{ editingBooks ? 'Feito' : 'Editar' }}
            </button>
          </div>
          
          <ul v-if="booksLoading">
            <li>Carregando livros...</li>
          </ul>
          <ul v-else-if="booksDetails.length">
            <li v-for="(b, idx) in booksDetails" :key="idx" class="list-item">
              <a :href="b.key ? `https://openlibrary.org${b.key}` : '#'" target="_blank">
                {{ b.title || (b.works && b.works[0] && b.works[0].title) || 'Sem título' }}
              </a>
              <button v-if="editingBooks" @click="deleteBook(idx)" class="delete-btn">✕</button>
            </li>
          </ul>
          <p v-else>Sem livros nesta disciplina</p>

          <div v-if="editingBooks" class="add-form">
            <input v-model="newBook" placeholder="ISBN ou ID do livro (ex: OL17618370W.json)" />
            <button @click="addBook" class="add-btn">Adicionar</button>
          </div>
        </div>
			</div>
		</div>
	</main>
</template>

<style scoped>
aside{
  position:sticky;
}
.page-layout {
  display: flex;
  align-items: flex-start;
  margin-top: 6.45rem;
  min-height: auto;
  overflow-x: auto;
  flex-wrap: wrap; /* para telemovel */
}

.page-content {
  flex: 1;
  padding: 1rem;
  min-width: 250px;
  box-sizing: border-box;
  overflow-wrap: break-word;
}

.side-bar {
  width: 17%;
  min-width: 200px;
  background-color: #47a;
  border-right: 0.2rem solid #128;
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow-y: auto;
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
  background-color: transparent;
}

.side-bar ul li:hover {
  background-color: #128;
}

.modal-back {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: #47a;
  padding: 1.5rem;
  border: solid #128;
  border-radius: 2rem;
  width: 400px;
  max-width: 400px;
}

.modal-box ul {
  list-style: none;
  padding: 0;
}

.create-class-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.create-class-inputs input {
  width: 100%;
  max-width: 300px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

/* New styles for editable content */
.content-section {
  margin-bottom: 2rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  margin: 0;
}

.edit-btn {
  padding: 0.4rem 0.8rem;
  background-color: #128;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #0a5;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.delete-btn {
  padding: 0.2rem 0.6rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.3rem;
}

.add-form input,
.add-form select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  font-size: 0.95rem;
}

.add-form input:focus,
.add-form select:focus {
  outline: none;
  border-color: #128;
  box-shadow: 0 0 5px rgba(17, 136, 136, 0.3);
}

.add-btn {
  padding: 0.5rem 1rem;
  background-color: #128;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #0a5;
}

/* responsivo */
@media (max-width: 900px) {
  .page-layout {
    flex-direction: column;
    margin-top: 0;
    gap: 1rem;
  }

  .side-bar {
    position: static;
    width: 100%;
    border-right: none;
    border-bottom: 0.2rem solid #128;
    padding: 1rem;
    height: auto;
    margin-bottom: 0;
  }

  .page-content {
    left: 0;
    width: 100%;
    padding-top: 5rem;
    box-sizing: border-box;
  }
}

@media (max-width: 1025px) {
  .modal-box {
    width: 90%;
  }
}

@media (max-width: 500px) {
  .side-bar ul li {
    font-size: 0.9rem;
  }
  
  .list-item {
    flex-wrap: wrap;
  }
  
  .delete-btn {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>
