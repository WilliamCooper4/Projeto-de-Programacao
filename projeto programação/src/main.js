import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { RouterLink, RouterView } from 'vue-router'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
