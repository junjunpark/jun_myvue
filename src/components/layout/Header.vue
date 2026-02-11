
<template>
  <header class="header">
    <h1>
        <a href="/">LOGO</a>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return { title: 'Header' }
  }
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    display: flex;
}
</style>
