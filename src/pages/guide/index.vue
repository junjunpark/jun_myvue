<script setup>
import { reactive, ref } from 'vue'
import BottomSheet from '@/components/ui/BottomSheet.vue'

// 여러 예시 상태를 한 곳에 모아 관리
const show = reactive({
  basic: false,
  custom: false,
  withFooter: false,
  noTitle: false,
  full: false,
})

const selectedOption = ref(null)

const options = [
  { id: 1, label: '옵션 1', value: 'option1' },
  { id: 2, label: '옵션 2', value: 'option2' },
  { id: 3, label: '옵션 3', value: 'option3' },
]

const selectOption = (option) => {
  selectedOption.value = option
  show.basic = false
}

// 데모용: 간단하게 라디오/체크 상태도 저장(UX 확인용)
const filter = reactive({
  all: false,
  photo: false,
  video: false,
  sort: 'latest',
})
</script>

<template>
  <div class="guide-page">
    <div class="container">
      <h1 class="guide-title">BottomSheet 컴포넌트 가이드</h1>

      <!-- 1. 기본 사용 -->
      <section class="guide-section" aria-labelledby="sec-basic">
        <h2 id="sec-basic">1. 기본 사용</h2>

        <button type="button" class="btn-primary" @click="show.basic = true">
          기본 바텀시트 열기
        </button>

        <BottomSheet v-model="show.basic" title="옵션 선택">
          <ul class="option-list">
            <li v-for="option in options" :key="option.id">
              <button
                type="button"
                class="option-item"
                @click="selectOption(option)"
              >
                {{ option.label }}
              </button>
            </li>
          </ul>
        </BottomSheet>

        <p v-if="selectedOption" class="result">선택됨: {{ selectedOption.label }}</p>
      </section>

      <!-- 2. 커스텀 높이 -->
      <section class="guide-section" aria-labelledby="sec-custom">
        <h2 id="sec-custom">2. 커스텀 높이 (50%)</h2>

        <button type="button" class="btn-primary" @click="show.custom = true">
          50% 높이 바텀시트
        </button>

        <BottomSheet v-model="show.custom" title="필터" height="50%">
          <div class="filter-content">
            <fieldset class="filter-group">
              <legend>카테고리</legend>

              <label class="chk">
                <input v-model="filter.all" type="checkbox" />
                전체
              </label>

              <label class="chk">
                <input v-model="filter.photo" type="checkbox" />
                사진
              </label>

              <label class="chk">
                <input v-model="filter.video" type="checkbox" />
                동영상
              </label>
            </fieldset>

            <fieldset class="filter-group">
              <legend>정렬</legend>

              <label class="rad">
                <input v-model="filter.sort" type="radio" name="sort" value="latest" />
                최신순
              </label>

              <label class="rad">
                <input v-model="filter.sort" type="radio" name="sort" value="popular" />
                인기순
              </label>
            </fieldset>
          </div>
        </BottomSheet>
      </section>

      <!-- 3. 푸터 포함 -->
      <section class="guide-section" aria-labelledby="sec-footer">
        <h2 id="sec-footer">3. 푸터 버튼 포함</h2>

        <button type="button" class="btn-primary" @click="show.withFooter = true">
          푸터 있는 바텀시트
        </button>

        <BottomSheet v-model="show.withFooter" title="게시물 삭제">
          <p class="warning-text">
            정말 이 게시물을 삭제하시겠습니까?<br />
            삭제된 게시물은 복구할 수 없습니다.
          </p>

          <template #footer>
            <div class="footer-buttons">
              <button type="button" class="btn-secondary" @click="show.withFooter = false">
                취소
              </button>
              <button type="button" class="btn-danger" @click="show.withFooter = false">
                삭제
              </button>
            </div>
          </template>
        </BottomSheet>
      </section>

      <!-- 4. 제목 없이 (핸들만) -->
      <section class="guide-section" aria-labelledby="sec-notitle">
        <h2 id="sec-notitle">4. 제목 없이 (핸들만)</h2>

        <button type="button" class="btn-primary" @click="show.noTitle = true">
          제목 없는 바텀시트
        </button>

        <!-- ⭐ 기존 코드 버그 포인트: show-handle="true"인데 title이 없으면
             BottomSheet 구현에 따라 핸들이 안 나올 수 있어, 명시적으로 title을 null 처리/props 정리 -->
        <BottomSheet v-model="show.noTitle" :title="null" :show-handle="true">
          <div class="share-menu">
            <h3 class="share-title">공유하기</h3>

            <div class="share-grid">
              <button type="button" class="share-item">
                <span class="icon" aria-hidden="true">📱</span>
                <span>카카오톡</span>
              </button>

              <button type="button" class="share-item">
                <span class="icon" aria-hidden="true">💬</span>
                <span>메시지</span>
              </button>

              <button type="button" class="share-item">
                <span class="icon" aria-hidden="true">📧</span>
                <span>이메일</span>
              </button>

              <button type="button" class="share-item">
                <span class="icon" aria-hidden="true">🔗</span>
                <span>링크 복사</span>
              </button>
            </div>
          </div>
        </BottomSheet>
      </section>

      <!-- 5. 전체 높이 -->
      <section class="guide-section" aria-labelledby="sec-full">
        <h2 id="sec-full">5. 전체 높이 (full)</h2>

        <button type="button" class="btn-primary" @click="show.full = true">
          전체 높이 바텀시트
        </button>

        <BottomSheet v-model="show.full" title="약관 동의" height="full">
          <div class="terms-content">
            <h4>서비스 이용약관</h4>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>긴 내용이 들어갑니다...</p>
          </div>

          <template #footer>
            <button type="button" class="btn-primary btn-block" @click="show.full = false">
              동의합니다
            </button>
          </template>
        </BottomSheet>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guide-page {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.guide-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
}

.guide-section {
  margin-bottom: 60px;
  padding-bottom: 40px;
  border-bottom: 2px solid #efefef;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #262626;
  }
}

.btn-primary {
  background: #0095f6;
  color: #fff;
  border: 0;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0081d8;
  }
}

.btn-secondary {
  background: #efefef;
  color: #262626;
  border: 0;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-danger {
  background: #ed4956;
  color: #fff;
  border: 0;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-block {
  width: 100%;
}

.result {
  margin-top: 16px;
  color: #0095f6;
  font-weight: 600;
}

/* 옵션 리스트: li 클릭 대신 button으로(접근성) */
.option-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.option-item {
  width: 100%;
  text-align: left;
  padding: 16px;
  border: 0;
  border-bottom: 1px solid #efefef;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fafafa;
  }
}

.option-list li:last-child .option-item {
  border-bottom: 0;
}

/* 필터 */
.filter-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-group {
  border: 0;
  padding: 0;
  margin: 0;

  legend {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .chk,
  .rad {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    cursor: pointer;
  }
}

/* 경고 텍스트 */
.warning-text {
  text-align: center;
  line-height: 1.6;
  color: #8e8e8e;
}

/* 푸터 버튼 */
.footer-buttons {
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }
}

/* 공유 메뉴 */
.share-title {
  text-align: center;
  margin: 0 0 24px 0;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #fafafa;
  }

  .icon {
    font-size: 32px;
  }

  span:last-child {
    font-size: 12px;
    color: #262626;
  }
}

/* 약관 */
.terms-content {
  padding: 20px 0;

  h4 {
    margin-bottom: 16px;
  }

  p {
    line-height: 1.6;
    color: #262626;
    margin-bottom: 12px;
  }
}
</style>
