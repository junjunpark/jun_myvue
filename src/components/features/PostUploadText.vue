<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  file: { type: Object, default: null },
  filter: { type: String, default: '' } // 필터 받기
})

const emit = defineEmits(['draft-change'])

const previewUrl = ref('')
const text = ref('')

watchEffect((onCleanup) => {
  const file = props.file
  if (!file) {
    previewUrl.value = ''
    return
  }

  const url = URL.createObjectURL(file)
  previewUrl.value = url

  onCleanup(() => URL.revokeObjectURL(url))
})

const onInput = () => {
  emit('draft-change', { text: text.value })
}
</script>

<template>
  <section>
    <div
      v-if="previewUrl"
      :class="['preview-container', filter]"
    >
      <img
        :src="previewUrl"
        alt="업로드 미리보기"
        class="w-full h-[450px] object-cover"
      />
      <figure></figure>
    </div>
    <div v-else class="upload-image"></div>

    <div class="write">
      <textarea
        v-model="text"
        class="write-box"
        placeholder="내용을 입력하세요"
        @input="onInput"
      ></textarea>
    </div>
  </section>
</template>

<style scoped>
.preview-container {
  position: relative;
  overflow: hidden;
}

.preview-container figure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

.write {
  padding: 16px;
}

.write-box {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  outline: none;
}

.write-box:focus {
  border-color: #0095f6;
}
</style>
