<template>
  <Modal @close="$emit('close')">
    <!-- 모달 타이틀 슬롯 -->
    <template #modalTitle>
      🗑️ Delete Todo
    </template>

    <!-- 모달 콘텐츠 슬롯 -->
    <template #modalContent>
      <div class="alert alert-warning mb-0">
        <strong>Warning!</strong> Are you sure you want to delete this todo?
        <br />
        This action cannot be undone.
      </div>
    </template>

    <!-- 모달 푸터 슬롯 -->
    <template #modalFooter>
      <button
        type="button"
        class="btn btn-secondary"
        @click="$emit('close')"
      >
        <i class="bi bi-x-circle"></i> Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="$emit('confirm')"
      >
        <i class="bi bi-trash"></i> Delete
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';

export default {
  components: {
    Modal
  },
  emits: ['close', 'confirm']
}
</script>
