<template>
<Teleport to="#portal-root">
  <!-- 배경 오버레이 -->
  <div class="modal-dimmed show" @click="closeModal"></div>

  <!-- 모달 -->
  <div
    ref="modalRef"
    class="modal d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
    @keydown="handleKeydown"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">
            <!-- ✅ 모달 타이틀 슬롯 -->
            <slot name="modalTitle"></slot>
          </h5>
          <button
            ref="closeButtonRef"
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>

        <!-- 모달 본문 -->
        <div class="modal-body">
          <!-- ✅ 모달 콘텐츠 슬롯 -->
          <slot name="modalContent"></slot>
        </div>

        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <!-- ✅ 모달 푸터 슬롯 -->
          <slot name="modalFooter" :close="closeModal"></slot>
        </div>
      </div>
    </div>
  </div>
</Teleport>
</template>

<script>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';

export default {
  emits: ['close'],
  setup(props, { emit }) {
    const modalRef = ref(null);
    const closeButtonRef = ref(null);

    // 모달 닫기
    const closeModal = () => {
      emit('close');
    }

    // ESC 키로 모달 닫기
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    // Focus Trap: 탭 키 제어 (접근성)
    // 모달 내부에서만 포커스가 이동하도록 제한
    const handleTabKey = (event) => {
      if (event.key !== 'Tab' || !modalRef.value) return;

      // 모달 내의 모든 포커스 가능한 요소 찾기
      const focusableElements = modalRef.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab (역방향 이동)
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
      // Tab (정방향 이동)
      else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    // 모달이 열릴 때 실행
    onMounted(async () => {
      // 접근성: 뒷 배경을 스크린 리더에서 숨김
      const app = document.getElementById('app');
      if (app) {
        app.setAttribute('aria-hidden', 'true');
      }

      // 배경 스크롤 방지
      document.body.style.overflow = 'hidden';

      // Tab 키 이벤트 리스너 추가 (Focus Trap)
      document.addEventListener('keydown', handleTabKey);

      // 모달이 렌더링된 후 X 버튼에 자동 포커스
      await nextTick();
      if (closeButtonRef.value) {
        closeButtonRef.value.focus();
      }
    })

    // 모달이 닫힐 때 실행
    onUnmounted(() => {
      // 접근성: 뒷 배경을 다시 스크린 리더에 노출
      const app = document.getElementById('app');
      if (app) {
        app.removeAttribute('aria-hidden');
      }

      // 배경 스크롤 복구
      document.body.style.overflow = '';

      // Tab 키 이벤트 리스너 제거
      document.removeEventListener('keydown', handleTabKey);
    })

    return {
      modalRef,
      closeButtonRef,
      closeModal,
      handleKeydown
    }
  }
}
</script>

<style>
/* 부트스트랩 변수가 적용되도록 scoped 제거 */

/* 모달 배경 오버레이 */
.modal-dimmed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

/* 모달 */
.modal {
  z-index: 100;
}
</style>
