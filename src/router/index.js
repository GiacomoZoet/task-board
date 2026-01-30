import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/authentication.js'
import HomeView from "@/views/HomeView.vue";
import WorkspaceView from "@/views/WorkspaceView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: HomeView, meta: { title: 'Home',  requireAuth: true }},
    {path: '/workspace', component: WorkspaceView, meta: { title: 'Workspace',  requireAuth: true }},
    {path: '/login', component: LoginView, meta: { title: 'Login'}},
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (isAuthenticated()) {
      next() // allowed to access
    } else {
      next('/login')
    }
  } else {
    next() // is not a protected routed
  }
})

export default router
