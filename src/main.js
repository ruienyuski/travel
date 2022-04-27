import { createApp } from 'vue';
import { Quasar, setCssVar } from 'quasar';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import App from './App.vue';
import router from './router';
import quasarUserOptions from './quasar-user-options';

setCssVar('primary', '#FF1D6C');
setCssVar('secondary', '#FFB72C');
setCssVar('accent', '#007350');

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(Quasar, quasarUserOptions);
app.component('Loading', Loading);
app.provide('axios', app.config.globalProperties.axios);// provide 'axios'
app.mount('#app');
