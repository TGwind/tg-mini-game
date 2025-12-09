<template>
  <div class="game-page">
    <section class="panel">
      <header class="panel-header">
        <div>
          <p class="eyebrow">升级版连连看</p>
          <h2>连接两两相同的图标，完成配对挑战！</h2>
          <p class="sub">限时消除、连击加成、提示与重排，体验更丰富的连连看玩法。</p>
        </div>
        <div class="status">
          <div class="status-row">
            <span class="badge" :class="isPlaying ? 'badge-success' : 'badge-muted'">
              {{ isPlaying ? '进行中' : '未开始' }}
            </span>
            <span class="time">剩余时间：<strong>{{ session.timeLeft }}s</strong></span>
          </div>
          <div class="status-row">
            <span>当前得分：<strong>{{ currentScore }}</strong></span>
            <span>最佳：<strong>{{ bestScore }}</strong></span>
            <span>剩余对数：<strong>{{ session.pairsLeft }}</strong></span>
          </div>
          <div class="status-row">
            <span>连击：<strong>x{{ session.combo + 1 }}</strong></span>
            <span class="hint">{{ session.message }}</span>
          </div>
        </div>
      </header>

      <GameBoard
        :score="currentScore"
        @progress="handleProgress"
        @score="updateScore"
        @start="handleStart"
        @stop="handleStop"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

interface GameProgressPayload {
  timeLeft: number
  pairsLeft: number
  combo: number
  message: string
}

const gameStore = useGameStore()
const { isPlaying, currentScore, bestScore } = storeToRefs(gameStore)

const session = reactive<GameProgressPayload>({
  timeLeft: gameStore.timeLimit,
  pairsLeft: 0,
  combo: 0,
  message: '点击开始生成棋盘'
})

const handleStart = () => {
  gameStore.startGame()
  session.message = '寻找可以连接的图标！'
}

const handleStop = async () => {
  await gameStore.endGame()
}

const updateScore = (score: number) => {
  gameStore.updateScore(score)
}

const handleProgress = (payload: GameProgressPayload) => {
  session.timeLeft = payload.timeLeft
  session.pairsLeft = payload.pairsLeft
  session.combo = payload.combo
  session.message = payload.message
  gameStore.updateTimeLeft(payload.timeLeft)
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
  flex-wrap: wrap;
}

.status {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.status-row {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}

.time {
  color: #fbbf24;
}

.sub {
  color: #94a3b8;
  margin-top: 6px;
}

.hint {
  color: #38bdf8;
}

@media (max-width: 800px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
