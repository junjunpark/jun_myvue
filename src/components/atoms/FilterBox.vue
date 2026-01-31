<script setup>
const props = defineProps({
  filter: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  isSelected: { type: Boolean, default: false }
})
</script>

<template>
  <div
    :class="['filter-item', filter, { selected: isSelected }]"
    :style="{
      backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
    }"
  >
    <figure></figure>
  </div>
</template>

<style scoped>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px;
  display: inline-block;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
  position: relative;
  overflow: hidden;
}

.filter-item figure {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.filter-item:hover {
  border-color: #4a9eff;
}

.filter-item.selected {
  border-color: #0095f6;
  border-width: 3px;
}
</style>
