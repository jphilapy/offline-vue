import { createRouter, createWebHistory } from 'vue-router';
import ContactsList from './components/ContactsList.vue'; // Import your component
// import other components and views as needed

const routes = [
    {
        path: '/',
        component: ContactsList,
    },
    // Define other routes here
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
