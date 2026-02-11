
<template>
<header class="header">
    <!-- <h1>
        <a href="/">LOGO</a>
    </h1> -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" :to="{name : 'todos'}">Todos</router-link>
                </li>
            </ul>
        </div>
    </nav>
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

</style>
