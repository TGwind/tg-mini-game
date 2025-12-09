<template>
  <div class="game-page">
    <section class="panel">
      <header class="panel-header">
        <div>
          <p class="eyebrow">得分挑战</p>
          <h2>点击计分按钮，不断刷新成绩！</h2>
        </div>
        <div class="status">
          <span class="badge" :class="isPlaying ? 'badge-success' : 'badge-muted'">
            {{ isPlaying ? '进行中' : '未开始' }}
          </span>
          <span>当前得分：<strong>{{ currentScore }}</strong></span>
        </div>
      </header>

      <GameBoard
        :is-playing="isPlaying"
        :score="currentScore"
        @start="handleStart"
        @stop="handleStop"
        @score="updateScore"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { isPlaying, currentScore } = storeToRefs(gameStore)

const handleStart = () => {
  gameStore.startGame()
}

const handleStop = async () => {
  await gameStore.endGame()
}

const updateScore = (score: number) => {
  gameStore.updateScore(score)
}
</script>

<style scoped>
.game-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.status {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
}

.eyebrow {
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #38bdf8;
  font-weight: 600;
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.badge-success {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.badge-muted {
  background: rgba(148, 163, 184, 0.15);
  color: #cbd5e1;
}

@media (max-width: 800px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
