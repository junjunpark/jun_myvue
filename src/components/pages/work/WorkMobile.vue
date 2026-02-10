<script setup>
import { ref } from 'vue'
import BottomSheet from '@/components/ui/BottomSheet.vue'

// 게시물 데이터 (예시)
const posts = ref([
  { id: 1, image: '/images/post1.jpg', likes: 120, comments: 15 },
  { id: 2, image: '/images/post2.jpg', likes: 250, comments: 32 },
  { id: 3, image: '/images/post3.jpg', likes: 89, comments: 8 },
])

// 바텀시트 상태
const showMenu = ref(false)
const showFilter = ref(false)
const showShare = ref(false)

// 선택된 게시물
const selectedPost = ref(null)

// 필터 상태
const filterType = ref('all') // 'all', 'photo', 'video'
const sortBy = ref('latest') // 'latest', 'popular'

// 메뉴 열기
const openMenu = (post) => {
  selectedPost.value = post
  showMenu.value = true
}

// 필터 적용
const applyFilter = () => {
  console.log('필터 적용:', { filterType: filterType.value, sortBy: sortBy.value })
  showFilter.value = false
}

// 필터 초기화
const resetFilter = () => {
  filterType.value = 'all'
  sortBy.value = 'latest'
}

// 공유하기
const share = (platform) => {
  console.log(`${platform}로 공유`)
  showShare.value = false
}

// 게시물 삭제
const deletePost = () => {
  if (selectedPost.value) {
    posts.value = posts.value.filter(p => p.id !== selectedPost.value.id)
    showMenu.value = false
  }
}
</script>

<template>
  <div class="work-mobile">
    <!-- 헤더 -->
    <header class="header">
      <h1>작업물</h1>
      <button
        @click="showFilter = true"
        class="filter-btn"
        aria-label="필터"
      >
        <span class="icon">⚙️</span>
      </button>
    </header>

    <!-- 게시물 그리드 -->
    <div class="posts-grid">
      <article
        v-for="post in posts"
        :key="post.id"
        class="post-item"
      >
        <img
          :src="post.image"
          :alt="`게시물 ${post.id}`"
          class="post-image"
        >

        <div class="post-overlay">
          <button
            @click="openMenu(post)"
            class="more-btn"
          >
            ⋮
          </button>
          <button
            @click="selectedPost = post; showShare = true"
            class="share-btn"
          >
            공유
          </button>
        </div>

        <div class="post-info">
          <span>❤️ {{ post.likes }}</span>
          <span>💬 {{ post.comments }}</span>
        </div>
      </article>
    </div>

    <!-- 바텀시트 1: 게시물 메뉴 -->
    <BottomSheet
      v-model="showMenu"
      :show-handle="true"
    >
      <ul class="menu-list">
        <li @click="showMenu = false" class="menu-item">
          수정하기
        </li>
        <li @click="selectedPost = null; showShare = true; showMenu = false" class="menu-item">
          공유하기
        </li>
        <li @click="showMenu = false" class="menu-item">
          링크 복사
        </li>
        <li @click="deletePost" class="menu-item danger">
          삭제하기
        </li>
        <li @click="showMenu = false" class="menu-item cancel">
          취소
        </li>
      </ul>
    </BottomSheet>

    <!-- 바텀시트 2: 필터 -->
    <BottomSheet
      v-model="showFilter"
      title="필터 및 정렬"
      height="60%"
    >
      <div class="filter-section">
        <h4>타입</h4>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="filterType" value="all">
            전체
          </label>
          <label>
            <input type="radio" v-model="filterType" value="photo">
            사진만
          </label>
          <label>
            <input type="radio" v-model="filterType" value="video">
            동영상만
          </label>
        </div>
      </div>

      <div class="filter-section">
        <h4>정렬</h4>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="sortBy" value="latest">
            최신순
          </label>
          <label>
            <input type="radio" v-model="sortBy" value="popular">
            인기순
          </label>
        </div>
      </div>

      <template #footer>
        <div class="filter-footer">
          <button @click="resetFilter" class="btn-text">
            초기화
          </button>
          <button @click="applyFilter" class="btn-apply">
            적용
          </button>
        </div>
      </template>
    </BottomSheet>

    <!-- 바텀시트 3: 공유 -->
    <BottomSheet
      v-model="showShare"
      :show-handle="true"
    >
      <div class="share-container">
        <h3>공유하기</h3>
        <div class="share-options">
          <button @click="share('kakao')" class="share-option">
            <span class="share-icon">💬</span>
            <span>카카오톡</span>
          </button>
          <button @click="share('instagram')" class="share-option">
            <span class="share-icon">📷</span>
            <span>인스타그램</span>
          </button>
          <button @click="share('facebook')" class="share-option">
            <span class="share-icon">👥</span>
            <span>페이스북</span>
          </button>
          <button @click="share('twitter')" class="share-option">
            <span class="share-icon">🐦</span>
            <span>트위터</span>
          </button>
          <button @click="share('link')" class="share-option">
            <span class="share-icon">🔗</span>
            <span>링크 복사</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<style scoped>
.work-mobile {
  min-height: 100vh;
  background: #fafafa;
}

/* 헤더 */
.header {
  position: sticky;
  top: 0;
  background: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  z-index: 100;
}

.header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.filter-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 20px;
}

/* 게시물 그리드 */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  padding: 2px 0;
}

.post-item {
  position: relative;
  aspect-ratio: 1;
  background: #efefef;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.post-item:hover .post-overlay {
  opacity: 1;
}

.more-btn,
.share-btn {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.post-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: white;
  padding: 8px;
  display: flex;
  gap: 12px;
  font-size: 12px;
}

/* 메뉴 리스트 */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 16px 20px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #efefef;
  font-size: 16px;
}

.menu-item:hover {
  background: #fafafa;
}

.menu-item.danger {
  color: #ed4956;
  font-weight: 600;
}

.menu-item.cancel {
  font-weight: 600;
  border-bottom: none;
}

/* 필터 섹션 */
.filter-section {
  margin-bottom: 32px;
}

.filter-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
}

.radio-group input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.filter-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.btn-text {
  background: none;
  border: none;
  color: #8e8e8e;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 24px;
}

.btn-apply {
  flex: 1;
  background: #0095f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

/* 공유 */
.share-container {
  padding: 8px 0;
}

.share-container h3 {
  text-align: center;
  margin: 0 0 24px 0;
  font-size: 18px;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.share-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 16px 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}

.share-option:hover {
  background: #fafafa;
}

.share-icon {
  font-size: 32px;
}

.share-option span:last-child {
  font-size: 12px;
  color: #262626;
}
</style>
