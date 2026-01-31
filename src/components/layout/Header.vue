<script setup>
defineProps({
  step: { type: Number, required: true }
})

const emit = defineEmits(['change-step', 'upload'])

const go = (n) => emit('change-step', n)
const upload = () => emit('upload')
</script>

<template>
  <header class="bg-white min-h-[60px] px-4">
    <h1 class="logo">LOGO</h1>

    <div v-if="step === 1" class="flex items-center justify-between gap-2">
      <button type="button" @click="go(0)">Cancel</button>
      <button type="button" @click="go(2)">Next</button>
    </div>

    <div v-else-if="step === 2" class="flex items-center justify-between gap-2">
      <button type="button" @click="go(1)">Prev</button>
      <button type="button" @click="upload">Upload</button>
    </div>
  </header>
</template>
