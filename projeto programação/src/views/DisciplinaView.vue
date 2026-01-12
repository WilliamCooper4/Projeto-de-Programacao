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

var booktest = GetBook("OL17618370W.json")

console.log(booktest)

onMounted(async () => {
  await classesStore.fetchClasses();
  await usersStore.fetchUsers();
});

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

function selectClass(cls) {
  selectedClass.value = cls;
}

// xp
function giveXP(amount = 10) {
  if (!auth.user) return;
  auth.addExp(amount);
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

      <!-- adicionar disciplinas -->
      <div v-if="showClassPicker" class="modal-back">
        <div class="modal-box">
          <h2 style="text-align: center">Escolher Disciplinas</h2>

          <ul>
            <li v-for="cls in classesStore.classes" :key="cls.id">
              <label>
                <input
                  type="checkbox"
                  :value="cls.name"
                  v-model="selectedClasses"
                />
                {{ cls.name }}
              </label>
            </li>
          </ul>

          <div class="actions">
            <button
              class="login-btn"
              @click="
                saveClasses();
                openCloseClassPicker();
              "
            >
              Guardar
            </button>
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

        <h2>Exercícios</h2>
        <ul>
          <li v-for="ex in selectedClass.exercises" :key="ex.id">
            <a :href="ex.link" target="_blank" @click.prevent="giveXP(5)">{{
              ex.nome
            }}</a>
          </li>
        </ul>

					<h2>Material de Estudo</h2>
					<ul>
						<li v-for="res in selectedClass.resources" :key="res.id">
							<a :href="res.link" target="_blank" @click.prevent="giveXP(3)">{{ res.nome }}</a>
						</li>
					</ul>
					<h2>Livros</h2>
					<p>{{ booktest }}</p>
			</div>
		</div>
	</main>
</template>

<style scoped>
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

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
}
</style>
