<script setup>
const emit = defineEmits(['uploaded'])

const onFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  console.log('[Footer] file:', file) // ✅ 확인용
  emit('uploaded', file)

  e.target.value = '' // 같은 파일 재선택 가능(선택)
}
</script>

<template>
  <footer class="w-full bg-white" role="contentinfo">
    <div class="m-auto max-w-full md:max-w-[480px] min-h-[60px] flex items-center justify-center border-t border-gray-100">
      <input
        type="file"
        id="upload-file"
        class="sr-only"
        accept="image/*"
        @change="onFileChange"
      >
      <label
        for="upload-file"
        class="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full cursor-pointer"
        role="button"
        tabindex="0"
        aria-label="파일 업로드"
      >
        <span class="text-lg font-bold" aria-hidden="true">+</span>
      </label>
    </div>
  </footer>
</template>
