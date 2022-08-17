import axios from './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import {createPinia} from 'pinia'
import plus from './plugins/plus'
import global from './plugins/global'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'







const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(store).use(router).use(axios).use(pinia).use(plus).use(global).mount('#app')
