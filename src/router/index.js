// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// ✅ 홈(또는 랜딩) 페이지 하나 만들어서 연결
import HomePage from '@/pages/index.vue'          // 없으면 만들어도 됨
import GuidePage from '@/pages/guide/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ✅ 이제 / (또는 /myvue/)는 홈을 보여줌
    { path: '/', name: 'Home', component: HomePage },

    // ✅ /guide (또는 /myvue/guide)에서만 가이드가 보임
    { path: '/guide', name: 'Guide', component: GuidePage },
  ],
})

export default router
