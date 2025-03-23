import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './index.css';

// ApexCharts global
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueApexCharts);

// Registrar el componente globalmente con nombre <apexchart>
app.component('apexchart', VueApexCharts);

app.mount('#app');
