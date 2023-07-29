import { createApp } from 'vue'
import App from './App.vue'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .catch(function(err) {
            console.log(err);
        });
}

createApp(App).mount('#app')
