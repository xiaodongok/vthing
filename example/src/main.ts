import { createApp } from 'vue'
import App from './App.vue'
import {inputNumber} from "../../core";

const app = createApp(App)
app.directive("input-num",inputNumber)
app.mount('#app')

