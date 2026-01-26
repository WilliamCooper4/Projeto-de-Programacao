<script setup>
import { onMounted, computed, ref } from "vue";
import { useUsersStore } from "@/stores/users.js";
import { useClassesStore } from "@/stores/classes.js";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();
const user = computed(() => auth.user);

const classesStore = useClassesStore();
const usersStore = useUsersStore();

onMounted(() => {
  if (usersStore.users.length === 0) {
    usersStore.fetchUsers();
  }
  if (classesStore.classes.length === 0) {
    classesStore.fetchClasses();
  }
});

function changeRole(user, newRole) {
  const updatedUser = { ...user, role: newRole };
  usersStore.updateUser(updatedUser);
}

function deleteUser(userId) {
  usersStore.deleteUser(userId);
}

const newClassName = ref("");
const newClassDesc = ref("");
const selecteduser = ref(null);
const showClassPicker = ref(false);
const selectedClasses = ref([]);
async function createClass() {
  if (!newClassName.value) return;

  await classesStore.addClass({
    name: newClassName.value,
    description: newClassDesc.value,
    exercises: [],
    resources: [],
  });

  newClassName.value = "";
  newClassDesc.value = "";
}

function deleteClass(id) {
  classesStore.deleteClass(id);
}

function selectUser(user) {
  selecteduser.value = user;
}

function openCloseClassPicker() {
  if (!selecteduser.value) return;
  showClassPicker.value = !showClassPicker.value;
  if (showClassPicker.value) selectedClasses.value = [...selecteduser.value.classes];
}

async function saveClasses() {
  if (!selecteduser.value) return;

  selecteduser.value.classes = [...selectedClasses.value];

  // persistir na base de dados
  await usersStore.updateUser(selecteduser.value);

  showClassPicker.value = false;
}

</script>

<template>
  <body>
    <div v-if="user && user.role === 'admin'">
      <div class="title">
        <h1>Painel de Admin</h1>
      </div>
      <div>
        <RouterLink to="/EDis">
          <button>Editar Disciplinas</button>
        </RouterLink>
      </div>
      <h2>Lista de Utilizadores</h2>
      <div class="scrolllist">
        <div v-for="u in usersStore.users" :key="u.id" class="admin-row">

          <span class="user-email">{{u.username}} - {{ u.email }}</span>

          <div class="user-actions">
            <button @click="selectUser(u)">select</button>
          </div>
        </div>
      </div>
      <div v-if="selecteduser">
        <h2>Detalhes do Utilizador</h2>
        <p>Nome de utilizador: {{ selecteduser.username }}</p>
        <p>Email: {{ selecteduser.email }}</p>
        <p>Role: <select
              :value="selecteduser.role"
              @change="changeRole(selecteduser, $event.target.value)"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select></p>
            <button @click="deleteUser(selecteduser.id)">Apagar</button>
      </div>
      <div v-if="!selecteduser">
        <h2>Nenhum utilizador selecionado</h2>
        <p>Por favor, selecione um utilizador para ver os detalhes.</p>
      </div>
    </div>
    <div v-else class="title">
      <h1>É preciso ser administrador para ver esta página.</h1>
    </div>

    <!-- class picker modal -->
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
  </body>
</template>

<style scoped>
body {
  color: black;
  padding: 20px;
}

/* listas */
.scrolllist {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  max-height: 12rem;
  overflow-y: auto;
}

/* linha admin */
.admin-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  gap: 1rem;
  flex-wrap: wrap; /* para telemoveis */
}

/* email */
.user-email {
  flex: 1;
  text-align: left;
  word-break: break-word;
  min-width: 180px;
}

/* actions */
.user-actions {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-end;
}

/* caixas de texto */
input {
  padding: 0.4rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
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
@media (max-width: 700px) {
  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    width: 100%;
    justify-content: space-between;
  }

  select,
  button {
    width: 100%;
  }

  input {
    width: 100%;
    margin-right: 0;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.1rem;
  }
}

@media (max-width: 900px) {
  .user-email {
    min-width: 140px;
  }

  button {
    padding: 0.4rem 0.6rem;
  }
}
</style>
