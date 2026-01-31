<script setup>
import { ref, reactive } from 'vue'
import myimg1 from '@/assets/images/myimg1.png'
import myimg2 from '@/assets/images/myimg2.png'
import myimg3 from '@/assets/images/myimg3.png'

const products = ref(['역삼동', '천호동', '마포구'])
const price1 = ref(['60', '70', '80'])
const images = ref([myimg1, myimg2, myimg3])
const call = ref([0, 0, 0])
const modalStatus = ref(false)

const increase = (i) => {
  call.value[i]++
}

const nav = reactive([
  { text: "Home", link: "/" },
  { text: "Products", link: "/products" }
])

nav.push({ text: "Contact", link: "/contact" })
</script>

<template>
    <nav>
        <RouterLink
        v-for="gnb in nav"
        :key="gnb.text"
        :to="gnb.link"
        >{{ gnb.text }}</RouterLink>
    </nav>

  <div
    v-for="(title, i) in products"
    :key="title"
    class="box"
    >
    <div class="img">
      <img :src="images[i]" :alt="title + ' 원룸 이미지'">
    </div>
    <h4 @click="modalStatus = true">{{ title }} 원룸</h4>
    <p>{{ price1[i] }} 만원</p>
    <button @click="increase(i)">허위매물신고</button>
    <span>신고수: {{ call[i] }}</span>
  </div>

<div class="black-bg" v-if="modalStatus == true">
    <div class="white-bg">
        <h4>상세페이지임</h4>
        <p>상세페이지 내용임</p>
        <button @click="modalStatus = false">닫기</button>
    </div>
</div>

</template>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.black-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top:0; left: 0;
    padding: 40px;
    text-align: center;
}
.white-bg {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
}
nav {
    text-align: center;
    padding: 10px;
    background-color: #ddd;
    a {
        margin: 0 10px;
        text-decoration: none;
        color: #000;
        cursor: pointer;
    }
}
.box {
    margin-top: 40px;
    h4 {
        cursor: pointer;
    }
    .img {
        max-width: 200px;
        img {
            max-width: 100%;
            height: auto;
        }
        }
}
</style>
