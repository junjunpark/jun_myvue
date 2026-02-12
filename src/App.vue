<template>
  <DefaultLayout>
    <template v-slot:view>
        <router-view />
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  components: {
    DefaultLayout
  }
}
</script>
