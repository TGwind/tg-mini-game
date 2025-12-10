<template>
  <div class="game-page">
    <div class="aurora aurora-1" />
    <div class="aurora aurora-2" />
    <div class="halo halo-left" />
    <div class="halo halo-right" />
    <div class="grid-overlay" />
    <section class="panel">
      <header class="panel-header">
        <div>
          <p class="eyebrow">升级版连连看</p>
          <div class="title-row">
            <h2>连接两两相同的图标，完成配对挑战！</h2>
            <span class="pill gradient">限时狂飙</span>
          </div>
          <p class="sub">限时消除、连击加成、提示与重排，体验更丰富的连连看玩法。</p>
          <div class="chip-row">
            <span class="chip">⚡ 灵敏操作流</span>
            <span class="chip">🎯 零失误加成</span>
            <span class="chip">🏆 速通冲榜</span>
          </div>
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

      <div class="layout">
        <div class="board-wrapper">
          <GameBoard
            :score="currentScore"
            @progress="handleProgress"
            @score="updateScore"
            @start="handleStart"
            @stop="handleStop"
          />
        </div>
        <aside class="side-panel">
          <div class="card glass">
            <div class="card-title">实时状态</div>
            <div class="progress-track">
              <div class="progress-bar shimmer" :class="timeTone" :style="{ width: `${timeProgress}%` }"></div>
              <div class="progress-label">剩余时间：{{ session.timeLeft }}s / {{ gameStore.timeLimit }}s</div>
            </div>
            <div class="stats-grid">
              <div class="stat">
                <p class="label">当前分数</p>
                <strong>{{ currentScore }}</strong>
              </div>
              <div class="stat">
                <p class="label">最佳记录</p>
                <strong>{{ bestScore }}</strong>
              </div>
              <div class="stat">
                <p class="label">剩余对数</p>
                <strong>{{ session.pairsLeft }}</strong>
              </div>
              <div class="stat">
                <p class="label">连击倍率</p>
                <strong class="combo">x{{ session.combo + 1 }}</strong>
              </div>
            </div>
          </div>

          <div class="card tips">
            <div class="card-title">玩法技巧</div>
            <ul>
              <li>提示会自动扫描可连的组合，卡住时会帮你重排避免死局。</li>
              <li>保持连续命中可以快速叠加连击倍率，获取额外加分。</li>
              <li>重排后会清空已选择块，重新规划路线更稳。</li>
              <li>时间条归零会自动结束本局，别忘了及时扫完棋盘！</li>
            </ul>
          </div>

          <div class="card missions">
            <div class="card-title">局内挑战</div>
            <ul class="mission-list">
              <li>
                <span class="dot live"></span>
                30 秒内达成 3 连击，获得高分冲刺势能。
              </li>
              <li>
                <span class="dot combo"></span>
                保持零失误完成一对，避免打断连击梯度。
              </li>
              <li>
                <span class="dot shield"></span>
                卡住先用提示再重排，减少时间浪费。
              </li>
            </ul>
          </div>

          <div class="card broadcast">
            <div class="card-title">实时播报</div>
            <div class="ticker">
              <span class="pulse" />
              <p>{{ session.message }}</p>
            </div>
            <div class="chip-row subtle">
              <span class="chip soft">⏱️ {{ session.timeLeft }}s 剩余</span>
              <span class="chip soft">🔥 连击 x{{ session.combo + 1 }}</span>
              <span class="chip soft">🎯 目标 {{ session.pairsLeft }} 对</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'

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

const timeProgress = computed(() => Math.max(0, Math.min(100, (session.timeLeft / gameStore.timeLimit) * 100)))
const timeTone = computed(() => {
  if (timeProgress.value < 20) return 'danger'
  if (timeProgress.value < 45) return 'warning'
  return 'ok'
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
  position: relative;
  overflow: hidden;
}

.aurora {
  position: absolute;
  width: 420px;
  height: 420px;
  filter: blur(120px);
  opacity: 0.4;
  transform: translate(-50%, -50%);
}

.aurora-1 {
  top: 0;
  left: 25%;
  background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.6), transparent 55%);
}

.aurora-2 {
  bottom: -40px;
  right: -10%;
  background: radial-gradient(circle at 60% 60%, rgba(236, 72, 153, 0.5), transparent 55%);
}

.halo {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.35;
  pointer-events: none;
}

.halo-left {
  top: 40%;
  left: -160px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 55%);
}

.halo-right {
  bottom: 10%;
  right: -120px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.35), transparent 55%);
}

.grid-overlay {
  position: absolute;
  inset: 12px;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask: radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.15), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.25), transparent 50%);
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

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #0b1224;
}

.pill.gradient {
  background: linear-gradient(135deg, #f97316, #8b5cf6, #06b6d4);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.35);
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

.chip-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.chip-row.subtle {
  margin-top: 6px;
}

.chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  font-size: 12px;
  letter-spacing: 0.2px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
}

.chip.soft {
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.24);
  color: #e2e8f0;
  box-shadow: none;
}

.hint {
  color: #38bdf8;
  text-shadow: 0 0 12px rgba(56, 189, 248, 0.45);
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.board-wrapper {
  min-width: 0;
}

.side-panel {
  display: grid;
  gap: 12px;
}

.card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.card.glass {
  backdrop-filter: blur(10px);
  border-color: rgba(56, 189, 248, 0.25);
  box-shadow: 0 16px 30px rgba(56, 189, 248, 0.1);
}

.card-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.progress-track {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #22c55e, #38bdf8);
  transition: width 0.25s ease;
}

.progress-bar.warning {
  background: linear-gradient(135deg, #f59e0b, #f97316);
}

.progress-bar.danger {
  background: linear-gradient(135deg, #ef4444, #f97316);
  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35), 0 6px 18px rgba(248, 113, 113, 0.35);
}

.progress-bar.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 10%, rgba(255, 255, 255, 0.35) 40%, transparent 70%);
  animation: shimmer 1.6s linear infinite;
  mix-blend-mode: screen;
}

.progress-label {
  font-size: 12px;
  color: #cbd5e1;
  margin-top: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.stat {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px;
  display: grid;
  gap: 4px;
}

.stat strong {
  font-size: 18px;
}

.stat .combo {
  color: #f97316;
  text-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
}

.tips ul {
  list-style: disc;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: #cbd5e1;
}

.tips li::marker {
  color: #38bdf8;
}

.missions {
  display: grid;
  gap: 8px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.08));
  border-color: rgba(16, 185, 129, 0.35);
}

.mission-list {
  display: grid;
  gap: 8px;
  color: #e2e8f0;
  padding-left: 0;
  list-style: none;
}

.mission-list li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);
}

.dot.live {
  background: #22c55e;
  box-shadow: 0 0 14px rgba(34, 197, 94, 0.7);
}

.dot.combo {
  background: #f97316;
  box-shadow: 0 0 14px rgba(249, 115, 22, 0.7);
}

.dot.shield {
  background: #38bdf8;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.7);
}

.broadcast {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.08));
  border-color: rgba(59, 130, 246, 0.25);
}

.ticker {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pulse {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  animation: pulse 1.6s infinite;
}

.ticker p {
  color: #e2e8f0;
}

@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 12px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

@media (max-width: 800px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
