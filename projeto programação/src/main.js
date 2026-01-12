import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { RouterLink, RouterView } from 'vue-router'
import "./assets/style.css"
import { onMounted } from 'vue'
import { setupCalendar } from 'v-calendar';
import 'https://openlibrary.org/search.json';


const app = createApp(App)

// Use calendar defaults (optional)
app.use(setupCalendar, {})
app.use(createPinia())
app.use(router)

app.mount('#app')
