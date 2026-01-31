<script setup>
import { ref, watchEffect } from 'vue'
import FilterBox from '@/components/atoms/FilterBox.vue'

const props = defineProps({
  file: { type: Object, default: null }
})

const emit = defineEmits(['draft-change'])

const previewUrl = ref('')
const selectedFilter = ref('') // 선택된 필터

// CSSgram 필터 목록
const postFilters = [
  "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird",
  "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven",
  "mayfair", "moon", "nashville", "perpetua", "reyes", "rise",
  "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"
]

// 필터 선택 함수
const selectFilter = (filter) => {
  selectedFilter.value = filter
  // 부모에게 필터 변경 알림
  emit('draft-change', { filter: filter })
}

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
</script>

<template>
  <section>
    <div
      v-if="previewUrl"
      :class="['preview-container', selectedFilter]"
    >
      <img
        :src="previewUrl"
        alt="업로드 미리보기"
        class="w-full h-[450px] object-cover"
      />
      <figure></figure>
    </div>

    <div v-else class="upload-image"></div>

    <div class="filters">
      <FilterBox
        v-for="filter in postFilters"
        :key="filter"
        :filter="filter"
        :image-url="previewUrl"
        :is-selected="selectedFilter === filter"
        @click="selectFilter(filter)"
      />
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
</style>
