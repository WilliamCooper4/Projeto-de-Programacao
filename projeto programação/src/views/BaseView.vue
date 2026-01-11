<template>
  <div class="home-page">

    <!-- Boas-vindas -->
    <section class="welcome">
      <h1>Bem-vindo ao Study Tracker!</h1>
      <p>Este é o portal oficial de acompanhamento de disciplinas da nossa escola. Aqui podes acompanhar o teu progresso, gerir disciplinas e aceder a todos os recursos da tua formação.</p>
    </section>

    <!-- Explicação das páginas -->
    <section class="features">
      <h2>O que podes fazer:</h2>
      <ul>
        <li>
          <strong>Disciplinas:</strong> Vê todas as disciplinas em que estás inscrito, explora exercícios e materiais de estudo.
        </li>
        <li>
          <strong>Calendário:</strong> Consulta os eventos importantes, deadlines e testes agendados.
        </li>
        <li>
          <strong>Perfil:</strong> Acompanha o teu nível, streak e experiência acumulada. Também podes ver quais disciplinas estás a seguir.
        </li>
        <li v-if="auth.user?.role === 'admin'">
          <strong>Painel de Admin:</strong> Gestão de utilizadores e disciplinas. Só acessível a administradores.
        </li>
      </ul>
    </section>

    <!-- Destaque do utilizador (se estiver logado) -->
    <section v-if="auth.isLoggedIn" class="user-summary">
      <h2>Olá, {{ auth.user.email }}!</h2>
      <p>Já tens {{ auth.user.exp }} XP (nível {{ auth.user.lvl }}) e estás num streak de {{ auth.user.streak }} dias!</p>
      <div class="xp-bar-background">
        <div class="xp-bar-fill" :style="{ width: (auth.user.exp % 100) + '%' }"></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.home-page {
  padding: 2rem;
  font-family: "Maiandra GD", Arial, sans-serif;
  color: #128;
}

.welcome {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.features {
  max-width: 800px;
  margin: 0 auto 3rem;
  background-color: #eef;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid #128;
}

.features h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.user-summary {
  text-align: center;
  margin-bottom: 2rem;
}

.xp-bar-background {
  width: 60%;
  height: 1.5rem;
  background-color: #abf8f0;
  border-radius: 10px;
  margin: 0.5rem auto;
  overflow: hidden;
  outline: #128 solid 0.2em;
}

.xp-bar-fill {
  height: 100%;
  background-color: #47a;
  width: 0;
  transition: width 0.5s ease;
  outline: #128 solid;
}

.home-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.login-btn {
  padding: 0.5rem 1.5rem;
  background-color: #128;
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #081144;
}

/* Responsividade */
@media (max-width: 700px) {
  .xp-bar-background {
    width: 90%;
  }

  .features {
    width: 95%;
  }
}
</style>