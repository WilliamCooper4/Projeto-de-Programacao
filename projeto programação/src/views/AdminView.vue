<script setup>
import { onMounted, computed, ref } from "vue";
import { useUsersStore } from "@/stores/users";
import { useClassesStore } from "@/stores/classes";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const user = computed(() => auth.user);

const classesStore = useClassesStore();
const usersStore = useUsersStore();

onMounted(() => {
  usersStore.fetchUsers();
  classesStore.fetchClasses();
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

          <span class="user-email">{{u.username}} - {{ u.email }}</span>

          <div class="user-actions">
            <button>select</button>
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

      <div>
        <RouterLink to="/EDis">
          <button>Editar classes</button>
        </RouterLink>
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
