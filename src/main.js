import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from './views/Home.vue'
import Pokemon from './views/pokemon/Pokemon.vue'
import Expedition from './views/pokemon/Expedition.vue'

import './index.css'
import architecture from './architecture'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/pokemon', name: 'Pokémon', component: Pokemon},
        {path: '/pokemon/swsh-expedition', name: 'Expédition Dynamax', component: Expedition}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
