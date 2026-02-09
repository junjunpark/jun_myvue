<script setup>
import { ref, watch } from 'vue'
import FilterBox from '@/components/atoms/FilterBox.vue'

const props = defineProps({
  file: { type: Object, default: null }
})

const emit = defineEmits(['draft-change'])

const previewUrl = ref('')
const selectedFilter = ref('')
const filtersScroll = ref(null)

// 그래빙 상태
const isDragging = ref(false)
const startX = ref(0)
const scrollLeftStart = ref(0)
const hasMoved = ref(false)

// CSSgram 필터 목록
const postFilters = [
  "aden", "x1977", "brannan", "brooklyn", "clarendon", "earlybird",
  "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven",
  "mayfair", "moon", "nashville", "perpetua", "reyes", "rise",
  "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"
]

// 필터 선택 함수
const selectFilter = (filter) => {
  console.log('selectFilter 호출됨:', filter, 'hasMoved:', hasMoved.value)

  // 드래그했으면 선택 안 함
  if (hasMoved.value) {
    console.log('드래그 중이었으므로 선택 취소')
    return
  }

  console.log('필터 선택:', filter)
  selectedFilter.value = filter
  emit('draft-change', { filter: filter })
}

// 마우스 이벤트
const onMouseDown = (e) => {
  isDragging.value = true
  hasMoved.value = false
  startX.value = e.pageX - filtersScroll.value.offsetLeft
  scrollLeftStart.value = filtersScroll.value.scrollLeft
  console.log('mousedown')
}

const onMouseMove = (e) => {
  if (!isDragging.value) return

  e.preventDefault()
  const x = e.pageX - filtersScroll.value.offsetLeft
  const walk = (x - startX.value) * 2
  filtersScroll.value.scrollLeft = scrollLeftStart.value - walk

  // 5px 이상 움직이면 드래그로 간주
  if (Math.abs(walk) > 5) {
    hasMoved.value = true
    console.log('드래그 중')
  }
}

const onMouseUp = () => {
  isDragging.value = false
  console.log('mouseup, hasMoved:', hasMoved.value)

  // 50ms 후 hasMoved 초기화 (클릭 이벤트가 먼저 실행되도록)
  setTimeout(() => {
    hasMoved.value = false
  }, 100)
}

const onMouseLeave = () => {
  isDragging.value = false
  hasMoved.value = false
}

watch(() => props.file, (newFile) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  if (!newFile) {
    previewUrl.value = ''
    selectedFilter.value = ''
    return
  }

  previewUrl.value = URL.createObjectURL(newFile)
}, { immediate: true })
</script>

<template>
  <section class="upload-section">
    <div
      v-if="previewUrl"
      :class="['preview-container', selectedFilter]"
    >
      <img
        :src="previewUrl"
        alt="업로드 미리보기"
        class="object-cover w-full"
      />
      <figure></figure>
    </div>

    <div v-else class="upload-image"></div>

    <div v-if="previewUrl" class="filters-container">
      <div
        ref="filtersScroll"
        class="filters-scroll"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
      >
        <div
          v-for="filter in postFilters"
          :key="filter"
          class="filter-wrapper"
          @click="selectFilter(filter)"
        >
          <FilterBox
            :filter="filter"
            :image-url="previewUrl"
            :is-selected="selectedFilter === filter"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.upload-section {
  /* 전체 패딩 없음 */
}

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

.upload-image {
  width: 100%;
  height: 400px;
  background-color: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
}

.filters-container {
  padding: 16px;
  width: 100%;
  overflow: hidden;
}

.filters-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.filters-scroll:active {
  cursor: grabbing;
}

.filter-wrapper {
  display: inline-block;
  flex-shrink: 0;
  cursor: pointer;
}

.filters-scroll::-webkit-scrollbar {
  height: 6px;
}

.filters-scroll::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.filters-scroll::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.filters-scroll::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
