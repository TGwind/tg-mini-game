import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GameState } from '@/types/game'

export const useGameStore = defineStore('game', () => {
  const isPlaying = ref(false)
  const currentScore = ref(0)

  // TODO: 实现开始游戏
  function startGame() {
    isPlaying.value = true
    currentScore.value = 0
    // TODO: 初始化游戏状态
  }

  // TODO: 实现结束游戏
  async function endGame() {
    isPlaying.value = false
    // TODO: 保存分数到后端
  }

  // TODO: 实现更新分数
  function updateScore(score: number) {
    currentScore.value = score
  }

  // TODO: 实现重置游戏
  function resetGame() {
    isPlaying.value = false
    currentScore.value = 0
  }

  return {
    isPlaying,
    currentScore,
    startGame,
    endGame,
    updateScore,
    resetGame
  }
})

