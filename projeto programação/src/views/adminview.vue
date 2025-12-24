<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    // Fetch and display list of users
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userlist');
            data.forEach(user => {
                const userItem = document.createElement('div');
                userItem.textContent = `ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`;
                userList.appendChild(userItem);
            });
        });
});

</script>

<template>
<body> 
    <div class="title">
        <h1>Painel de Admin</h1>
    </div>
    <h2>Lista de Utilizadores</h2>
    <div class="scrolllist" id="userlist">

    </div>
    <h2>Lista de Disciplina</h2>
    <div class="scrolllist" id="classlist">

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