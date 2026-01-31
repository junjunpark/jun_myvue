<script setup>
defineProps({
  profileImage: String,
  username: String,
  postImage: String,
  likes: Number,
  date: String,
  text: String,
  filter: { type: String, default: '' } // 필터 추가
})
</script>

<template>
  <article>
    <section class="px-2">
      <a href="#" class="inline-flex items-center py-2">
        <picture class="w-[60px] rounded-full overflow-hidden">
          <img :src="profileImage" :alt="username">
        </picture>
        <span class="ml-1">{{ username }}</span>
      </a>
    </section>

    <section>
      <div :class="['post-image-container', filter]">
        <picture>
          <source media="(max-width: 767px)" :srcset="postImage" />
          <img :src="postImage" :alt="username">
        </picture>
        <figure></figure>
      </div>
    </section>

    <section class="px-2">
      <span class="block pt-2 text-sm">{{ likes }} Likes</span>
      <div class="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-1 items-center mt-1">
        <em class="not-italic font-bold">{{ username }}</em>
        <span class="text-sm text-gray-300">{{ date }}</span>
        <p class="col-span-2">{{ text }}</p>
      </div>
    </section>
  </article>
</template>

<style scoped>
.post-image-container {
  position: relative;
  overflow: hidden;
}

.post-image-container figure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  pointer-events: none;
}
</style>
