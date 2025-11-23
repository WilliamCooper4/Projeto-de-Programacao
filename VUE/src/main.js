import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// carregar o user ao iniciar
import { useUserStore } from "./stores/useUserStore";
const userStore = useUserStore();
userStore.loadFromLocalStorage();