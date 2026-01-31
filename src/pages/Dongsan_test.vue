<!-- <script>
// import {apple} from './asstets/oneroom.js'
import list frome './asstets/oneroom.js'

export default {
  name : 'App',
  data(){
    return {
        modalStatus : false,
        nav : ["Home", "Products", "About"],
        price1 : 60,
        //products : ['역삼동', '천호동', '마포구'],
        products : list,
    }
  },
    methods : {
        increase() {
            this.신고수++
        }
    }
}

</script> -->
<script setup>
import { ref, reactive } from 'vue'

const products = ref(['역삼동', '천호동', '마포구'])
const price1 = ref(['60', '70', '80'])
const call = ref([0, 0, 0])

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
        <a
        v-for="gnb in nav"
        :key="gnb.text"
        :href="gnb.link"
        >{{ gnb.text }}</a>
    </nav>
    <nav>
        <RouterLink
        v-for="gnb in nav"
        :key="gnb.text"
        :to="gnb.link"
        >{{ gnb.text }}</RouterLink>
    </nav>
  <h1>You did it! vue</h1>
  <div
    v-for="(title, i) in products"
    :key="title"
    >
    <h4>{{ products[i].title }} 원룸</h4>
    <p>{{ price1[i] }} 만원</p>
    <button @click="increase(i)">허위매물신고</button>
    <span>신고수: {{ call[i] }}</span>
  </div>
</template>

<style scoped lang="scss">
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
</style>
