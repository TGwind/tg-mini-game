import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useGameStore = defineStore('game', () => {
  const isPlaying = ref(false)
  const currentScore = ref(0)
  const bestScore = ref(0)
  const userStore = useUserStore()
  const timeLimit = ref(90)
  const remainingTime = ref(0)

  function startGame() {
    isPlaying.value = true
    currentScore.value = 0
    remainingTime.value = timeLimit.value
  }

  async function endGame() {
    isPlaying.value = false
    if (currentScore.value > bestScore.value) {
      bestScore.value = currentScore.value
    }

    if (userStore.user && currentScore.value > userStore.user.score) {
      userStore.user = {
        ...userStore.user,
        score: currentScore.value
      }
    }
  }

  function updateScore(score: number) {
    currentScore.value = score
  }

  function updateTimeLeft(value: number) {
    remainingTime.value = value
  }

  function resetGame() {
    isPlaying.value = false
    currentScore.value = 0
    remainingTime.value = 0
  }

  return {
    isPlaying,
    currentScore,
    bestScore,
    timeLimit,
    remainingTime,
    startGame,
    endGame,
    updateScore,
    updateTimeLeft,
    resetGame
  }
})
