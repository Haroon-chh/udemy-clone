import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
window.katex = katex; // Make KaTeX globally available

const app = createApp (App);
app.use(store);
store.dispatch('initializeStore'); // Initialize the store on app load
app.use(router);
app.mount('#app')


