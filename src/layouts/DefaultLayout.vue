<template>
    <div id="skip" class="skip">
        <a href="#main">본문바로가기</a>
        <a href="#footer">하단메뉴바로가기</a>
    </div>
    <div id="wrapper" class="wrapper">
        <Header />
        <main id="main" tabindex="-1">
            <!-- <LayoutMain /> -->
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
// import LayoutMain from '@/components/layout/LayoutMain.vue'

export default {
  components: {
    Header,
    Footer,
    // LayoutMain
  }
}
</script>
