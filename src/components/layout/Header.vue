<script setup>
defineProps({
  step: { type: Number, required: true }
})

const emit = defineEmits(['change-step', 'upload'])

const go = (n) => emit('change-step', n)
const upload = () => emit('upload')
</script>

<template>
  <header class="bg-white min-h-[60px] px-4 flex w-full">
    <h1 class="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <a href="/">
            <svg class="logo" viewBox="0 0 128 128" width="24" height="24">
                <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"></path>
                <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"></path>
            </svg>
        </a>
    </h1>

    <div v-if="step === 1" class="flex items-center justify-between w-full gap-2">
      <button type="button" @click="go(0)">Cancel</button>
      <button type="button" @click="go(2)">Next</button>
    </div>

    <div v-else-if="step === 2" class="flex items-center justify-between w-full gap-2">
      <button type="button" @click="go(1)">Prev</button>
      <button type="button" @click="upload">Upload</button>
    </div>
  </header>
</template>
