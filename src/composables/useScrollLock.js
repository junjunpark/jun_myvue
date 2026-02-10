import { onUnmounted } from 'vue'

export function useScrollLock() {
  let scrollY = 0
  let isLocked = false

  const lockScroll = () => {
    if (isLocked) return

    // 현재 스크롤 위치 저장
    scrollY = window.scrollY

    // top 위치만 인라인으로 (스크롤 위치 유지용)
    document.body.style.top = `-${scrollY}px`

    // 나머지는 CSS 클래스로
    document.body.classList.add('scroll-locked')

    isLocked = true
  }

  const unlockScroll = () => {
    if (!isLocked) return

    // 클래스 제거
    document.body.classList.remove('scroll-locked')

    // top 제거
    document.body.style.top = ''

    // 스크롤 위치 복원
    window.scrollTo(0, scrollY)

    isLocked = false
  }

  onUnmounted(() => {
    if (isLocked) {
      unlockScroll()
    }
  })

  return {
    lockScroll,
    unlockScroll
  }
}
