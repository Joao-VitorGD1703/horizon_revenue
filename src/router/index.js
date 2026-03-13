import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('@/views/LandingPage.vue') },
    { path: '/login', component: () => import('@/views/Auth.vue') },
    { path: '/dashboard', component: () => import('@/views/Dashboard.vue') },
    { path: '/settings', component: () => import('@/views/Settings.vue') },
    { path: '/success', component: () => import('@/views/CheckoutSuccess.vue') },
    { path: '/docs', component: () => import('@/views/Documentation.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
