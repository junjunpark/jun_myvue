<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Insta from '@/pages/Insta.vue'
import { ref } from 'vue'
import { posts as initialPosts } from '@/data/posts.js'

defineOptions({ name: 'App' })

const step = ref(0)
const uploadedFile = ref(null)

// ✅ 화면에 그릴 진짜 posts 상태(여기에 unshift/append)
const postsState = ref([...initialPosts])

// ✅ 업로드 텍스트/필터 draft (step 2에서 작성)
const uploadDraft = ref({
  text: '',
  filter: 'perpetua'
})

const onUploaded = (file) => {
  uploadedFile.value = file
  step.value = 1
}

// ✅ Insta(더보기)에서 받아온 게시물들을 뒤에 붙이기
const appendPosts = (newPosts) => {
  if (!Array.isArray(newPosts) || !newPosts.length) return
  postsState.value.push(...newPosts)
}

// ✅ PostUploadText에서 draft 변경되면 저장
const onDraftChange = (draft) => {
  uploadDraft.value = { ...uploadDraft.value, ...draft }
}

// ✅ Header의 Upload 버튼 눌렀을 때 상단 추가
const onUpload = () => {
  // step 2에서만 업로드 허용(원하면 조건 제거 가능)
  if (step.value !== 2) return

  const newPost = {
    id: Date.now(),
    profileImage: 'https://picsum.photos/100?random=999',
    username: 'Me',
    postImage: uploadedFile.value ? URL.createObjectURL(uploadedFile.value) : '',
    likes: 0,
    date: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
    text: uploadDraft.value.text,
    filter: uploadDraft.value.filter
  }

  postsState.value.unshift(newPost)

  // ✅ 업로드 후 초기화
  uploadedFile.value = null
  uploadDraft.value = { text: '', filter: 'perpetua' }
  step.value = 0
}
</script>

<template>
  <div class="wrapper m-auto max-w-full md:max-w-[480px]">
    <Header
      class="sticky top-0 z-50"
      :step="step"
      @change-step="step = $event"
      @upload="onUpload"
    />

    <main class="pb-[100px]">
      <Insta
        :step="step"
        :uploaded-file="uploadedFile"
        :posts="postsState"
        @append-posts="appendPosts"
        @draft-change="onDraftChange"
      />
    </main>

    <Footer
      class="fixed bottom-0 left-0 z-50 min-h-[60px]"
      @uploaded="onUploaded"
    />
  </div>
</template>
