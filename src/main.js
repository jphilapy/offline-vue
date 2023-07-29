import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .catch(function(err) {
            console.log(err);
        });
}

const app = createApp(App);
app.use(router);
app.mount('#app');
