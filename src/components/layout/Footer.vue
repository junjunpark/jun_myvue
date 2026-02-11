<template>
  <footer id="footer" class="footer" tabindex="-1">
    <p> {{ title }}</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return { title: 'Footer' }
  }
}
</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}
</style>
