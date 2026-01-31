<script setup>
import { ref } from 'vue'

import Post from '@/components/features/Post.vue'
import PostUploadImage from '@/components/features/PostUploadImage.vue'
import PostUploadText from '@/components/features/PostUploadText.vue'
import { posts as initialPosts } from '@/data/posts.js'

defineProps({
  step: { type: Number, required: true },
  uploadedFile: { type: Object, default: null }
})

// ✅ 로컬 posts를 "상태"로 관리 (추가 로딩 데이터 append 가능)
const feedPosts = ref([...initialPosts])

const page = ref(0) // more0.json부터
const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

async function loadMore() {
  if (loading.value || done.value) return

  loading.value = true
  errorMsg.value = ''

  try {
    // ✅ GitHub Pages(서브 경로)에서도 안전한 base 만들기
    // 예: https://아이디.github.io + /jun_myvue/ => https://아이디.github.io/jun_myvue/
    const base = location.origin + import.meta.env.BASE_URL

    // 예: https://.../jun_myvue/ + vue/more0.json => https://.../jun_myvue/vue/more0.json
    const url = new URL(`vue/more${page.value}.json`, base).toString()

    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    // ✅ 응답이 배열이든 {posts:[...]}든 대응
    const newPosts = Array.isArray(data) ? data : (data?.posts ?? [])

    // ✅ 더 불러올 게 없으면 종료
    if (!newPosts.length) {
      done.value = true
      return
    }

    // ✅ id 중복 방지
    const existingIds = new Set(feedPosts.value.map(p => p.id))
    const filtered = newPosts.filter(p => !existingIds.has(p.id))

    feedPosts.value = [...feedPosts.value, ...filtered]
    page.value += 1
  } catch (e) {
    // ✅ 404면 "더 없음" 처리하고 싶다면 아래 주석 해제
    // if (String(e?.message ?? '').includes('HTTP 404')) done.value = true

    errorMsg.value = `불러오기 실패: ${e?.message ?? 'unknown error'}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="step === 0" class="space-y-8">
      <Post v-for="post in feedPosts" :key="post.id" v-bind="post" />

      <div class="flex items-center justify-center">
        <button
          type="button"
          class="inline-flex items-center justify-center px-2 py-1 text-sm text-gray-400 border border-gray-400 rounded-full disabled:opacity-50"
          :disabled="loading || done"
          @click="loadMore"
        >
          <span v-if="loading">LOADING...</span>
          <span v-else-if="done">NO MORE</span>
          <span v-else>MORE</span>
        </button>
      </div>

      <p v-if="errorMsg" class="text-sm text-center text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-else-if="step === 1">
      <PostUploadImage :file="uploadedFile" />
    </div>

    <div v-else-if="step === 2">
      <PostUploadText :file="uploadedFile" />
    </div>
  </div>
</template>

<style>
.upload-image{
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size : cover;
}
.filters{
  overflow-x:scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
