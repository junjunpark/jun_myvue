<template>
<Teleport to="#portal-root">
  <!-- 배경 오버레이 -->
  <div class="modal-backdrop show" @click="closeModal"></div>

  <!-- 모달 -->
  <div
    class="modal d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</Teleport>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: 'Delete Todo'
    },
    message: {
      type: String,
      default: 'Are you sure you want to delete this todo?'
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    }

    const confirmDelete = () => {
      emit('confirm');
    }

    // 모달이 열릴 때
    onMounted(() => {
      const app = document.getElementById('app');
      if (app) {
        app.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = 'hidden';  // 배경 스크롤 방지
    })

    // 모달이 닫힐 때
    onUnmounted(() => {
      const app = document.getElementById('app');
      if (app) {
        app.removeAttribute('aria-hidden');
      }
      document.body.style.overflow = '';  // 스크롤 복구
    })

    return {
      closeModal,
      confirmDelete
    }
  }
}
</script>

<style>
/* 부트스트랩 변수가 적용되도록 scoped 제거 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.modal {
  z-index: 100;
}
</style>
