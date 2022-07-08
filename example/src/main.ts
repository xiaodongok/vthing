import { createApp } from 'vue'
import App from './App.vue'
import {vInputNumber} from "../../core";

const app = createApp(App)
app.directive("input-number",vInputNumber)
app.mount('#app')
