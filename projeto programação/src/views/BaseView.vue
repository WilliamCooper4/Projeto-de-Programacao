<template>
  <div class="home">THIS IS HOME</div>
</template>

<style scoped>
/* limit width of this specific modal to make it appear smaller */
#loginModal .modal-dialog {
  max-width: 420px;
  margin: 1.75rem auto;
}

body {
  margin: 0;
  font-family: "Maiandra GD", Arial, sans-serif;
  background: #bbccff;
}

/* Barra de navegação */
nav {
  background: #47a;
  border-bottom: 0.2rem solid #112288;
  padding: 2rem 3rem;
  /* Aumenta altura e espaçamento */
  display: flex;
  gap: 3rem;
  /* Mais espaço entre itens */
  justify-content: center;
  align-items: center;
  font-size: 1.2rem; /* Torna o texto maior */

}

/* Links normais */
nav a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

/* Botão de Login */
nav a.login-btn {
  background: #fff;
  color: #4477aa;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
}

nav a.login-btn:hover {
  background: #eef;
}

/* Hover dos links normais */
nav a:hover:not(.login-btn) {
  text-decoration: underline;
}

#app {
  padding: 20px;
}

@font-face {
  font-family: "Maiandra GD";
  src: url("./MAIAN.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.side-bar {
  position: fixed;
  top: 6.45rem;
  margin-top: auto;
  background-color: #47a;
  border-right: 0.2rem solid #128;
  width: 17%;
  height: 85.85%;
}

.side-bar a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.mini-calendar {
  position: relative;
  background-color: white;
  height: 210px;
  width: 210px;
  left: 20px;
}

.calendar-filter {
  position: relative;

  height: 100px;
  width: 210px;
  left: 20px;
  margin-top: 10px;
}

.invisible {
  display: none;
}

.block {
  position: sticky;
  background: #47a;
  border-bottom: 0.2rem solid #112288;
  border-right: 0.2rem solid #128;

  padding: 2rem 3rem;
  /* Aumenta altura e espaçamento */
  display: flex;
  gap: 3rem;
  /* Mais espaço entre itens */
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  /* Torna o texto maior */
  width: 10.75%;
  top: 0;
  height: 6.45rem;
}

.login-box {
  width: 50%;
  background-color: #fff;
  position: fixed;
  left: 25%;
  top: 25%;
}

div.home {
  justify-content: center;
  display: flex;
  align-items: center;
  height: 580px;
  font-size: 500%;
}
</style>
