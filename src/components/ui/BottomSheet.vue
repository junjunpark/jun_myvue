<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  height: { type: String, default: 'auto' },
  closeOnOverlay: { type: Boolean, default: true },
  showHandle: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])

const isOpen = ref(props.modelValue)
const sheetRef = ref(null)

// 스크롤 락
const { lockScroll, unlockScroll } = useScrollLock()

// v-model 동기화 및 스크롤 락 제어
watch(() => props.modelValue, (newVal, oldVal) => {
  console.log('modelValue 변경:', oldVal, '→', newVal)

  isOpen.value = newVal

  if (newVal) {
    console.log('바텀시트 열림 - 스크롤 락')
    lockScroll()
    emit('open')
  } else if (oldVal === true && newVal === false) {
    console.log('바텀시트 닫힘 - 스크롤 언락')
    unlockScroll()
  }
})

// 컴포넌트 언마운트 시 안전장치
onUnmounted(() => {
  console.log('바텀시트 언마운트')
  unlockScroll()
})

// 닫기
const close = () => {
  console.log('close() 호출')
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

// 오버레이 클릭
const handleOverlayClick = (e) => {
  console.log('오버레이 클릭', e.target === e.currentTarget)
  if (props.closeOnOverlay && e.target === e.currentTarget) {
    close()
  }
}

// 높이 계산
const getHeight = () => {
  if (props.height === 'full') return '100%'
  if (props.height === 'auto') return 'auto'
  return props.height
}
</script>

<template>
  <Teleport to="#portal-root">
    <Transition name="bottom-sheet">
      <div
        v-if="isOpen"
        class="bottom-sheet-overlay"
        @click="handleOverlayClick"
      >
        <div
          ref="sheetRef"
          class="bottom-sheet"
          :style="{ height: getHeight() }"
          @click.stop
        >
          <!-- 핸들바 -->
          <div v-if="showHandle" class="bottom-sheet-handle">
            <span class="handle-bar"></span>
          </div>

          <!-- 헤더 -->
          <div v-if="title || $slots.header" class="bottom-sheet-header">
            <slot name="header">
              <h3 class="bottom-sheet-title">{{ title }}</h3>
            </slot>
            <button
              class="bottom-sheet-close"
              @click="close"
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          <!-- 본문 -->
          <div class="bottom-sheet-body">
            <slot></slot>
          </div>

          <!-- 푸터 (선택) -->
          <div v-if="$slots.footer" class="bottom-sheet-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 오버레이 */
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  align-items: flex-end;
}

/* 바텀시트 */
.bottom-sheet {
  position: relative;
  background: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

/* 핸들바 */
.bottom-sheet-handle {
  display: flex;
  justify-content: center;
  padding: 12px 0 8px;
  cursor: grab;
}

.handle-bar {
  width: 40px;
  height: 4px;
  background: #dbdbdb;
  border-radius: 2px;
}

/* 헤더 */
.bottom-sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #efefef;
}

.bottom-sheet-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.bottom-sheet-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
}

.bottom-sheet-close:hover {
  background: #f0f0f0;
  border-radius: 50%;
}

/* 본문 */
.bottom-sheet-body {
  padding: 20px;
}

/* 푸터 */
.bottom-sheet-footer {
  padding: 16px 20px;
  border-top: 1px solid #efefef;
  background: #fafafa;
}

/* 트랜지션 */
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: all 0.3s ease;
}

.bottom-sheet-enter-from .bottom-sheet,
.bottom-sheet-leave-to .bottom-sheet {
  transform: translateY(100%);
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}

.bottom-sheet-enter-to,
.bottom-sheet-leave-from {
  opacity: 1;
}

.bottom-sheet-enter-to .bottom-sheet,
.bottom-sheet-leave-from .bottom-sheet {
  transform: translateY(0);
}
</style>
