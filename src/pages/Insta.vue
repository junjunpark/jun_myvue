<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

import Post from '@/components/features/Post.vue'
import PostUploadImage from '@/components/features/PostUploadImage.vue'
import PostUploadText from '@/components/features/PostUploadText.vue'

const props = defineProps({
  step: { type: Number, required: true },
  uploadedFile: { type: Object, default: null },
  posts: { type: Array, required: true }
})

const emit = defineEmits(['append-posts', 'draft-change'])

const page = ref(0)
const loading = ref(false)
const done = ref(false)
const errorMsg = ref('')

const sentinelRef = ref(null)
const skipFirstIntersect = ref(true)

// ✅ uploadDraft 상태 추가
const uploadDraft = ref({
  text: '',
  filter: ''
})

async function loadMore() {
  if (loading.value || done.value) return

  loading.value = true
  errorMsg.value = ''

  try {
    const base = location.origin + import.meta.env.BASE_URL
    const url = new URL(`vue/more${page.value}.json`, base).toString()

    const { data } = await axios.get(url, {
      headers: {
        'Cache-Control': 'no-store'
      }
    })

    const newPosts = Array.isArray(data)
      ? data
      : (data?.posts ?? (data && typeof data === 'object' ? [data] : []))

    if (!newPosts.length) {
      done.value = true
      return
    }

    const existingIds = new Set(props.posts.map(p => p.id))
    const filtered = newPosts.filter(p => !existingIds.has(p.id))

    emit('append-posts', filtered)
    page.value += 1
  } catch (e) {
    // ✅ axios 에러 처리
    if (e.response?.status === 404) {
      done.value = true
      return
    }
    errorMsg.value = `불러오기 실패: ${e.response?.status || e.message || 'unknown error'}`
  } finally {
    loading.value = false
  }
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry.isIntersecting) return
      if (skipFirstIntersect.value) {
        skipFirstIntersect.value = false
        return
      }
      if (props.step === 0) loadMore()
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
  )

  if (sentinelRef.value) observer.observe(sentinelRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// ✅ draft 변경 시 로컬 상태도 업데이트하고 부모로 전달
const onDraftChange = (draft) => {
  uploadDraft.value = { ...uploadDraft.value, ...draft }
  emit('draft-change', uploadDraft.value)
}
</script>

<template>
  <div>
    <div v-if="step === 0" class="flex flex-col gap-8">
      <Post v-for="post in posts" :key="post.id" v-bind="post" />
      <div ref="sentinelRef" class="h-px -mt-8"></div>

      <p v-if="loading" class="text-sm text-center text-gray-400">LOADING...</p>
      <p v-if="errorMsg" class="text-sm text-center text-red-500">{{ errorMsg }}</p>
    </div>

    <div v-else-if="step === 1">
      <PostUploadImage :file="uploadedFile" @draft-change="onDraftChange" />
    </div>

    <div v-else-if="step === 2">
      <PostUploadText
        :file="uploadedFile"
        :filter="uploadDraft.filter"
        @draft-change="onDraftChange"
      />
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
