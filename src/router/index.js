// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// ✅ 홈(또는 랜딩) 페이지 하나 만들어서 연결
import HomePage from '@/pages/index.vue'          // 없으면 만들어도 됨
import GuidePage from '@/pages/guide/index.vue'
import TodosPage from '@/pages/todos/index.vue'
import TodoPage from '@/pages/todos/_id.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 홈을 보여줌
    { path: '/', name: 'Home', component: HomePage },

    // guide (/myvue/guide)에서만 가이드가 보임
    { path: '/guide', name: 'guide', component: GuidePage },
    // todos
    { path: '/todos', name: 'todos', component: TodosPage },
    { path: '/todos/:id', name: 'todo', component: TodoPage },
  ],
})

export default router
