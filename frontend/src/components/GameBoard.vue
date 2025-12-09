<template>
  <div class="game-board">
    <div class="score-display">
      <p class="label">当前分数</p>
      <div class="score">{{ score }}</div>
    </div>

    <div class="controls">
      <button class="btn primary" :disabled="isPlaying" @click="$emit('start')">
        {{ isPlaying ? '游戏进行中' : '开始游戏' }}
      </button>
      <button class="btn" :disabled="!isPlaying" @click="emitStop">结束游戏</button>
    </div>

    <div class="play-area">
      <p>按下下面的按钮来累积分数！</p>
      <button class="tap" :disabled="!isPlaying" @click="handleTap">+1</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isPlaying: boolean
  score: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'start'): void
  (e: 'stop'): void
  (e: 'score', value: number): void
}>()

const handleTap = () => {
  if (!props.isPlaying) return
  const next = props.score + 1
  emit('score', next)
}

const emitStop = () => {
  emit('stop')
}
</script>

<style scoped>
.game-board {
  display: grid;
  gap: 18px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.score-display {
  text-align: center;
}

.label {
  color: #cbd5e1;
}

.score {
  font-size: 48px;
  font-weight: 700;
  color: #38bdf8;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  background: transparent;
  color: #e5e7eb;
  flex: 1;
  min-width: 140px;
}

.btn.primary {
  background: linear-gradient(135deg, #06b6d4, #38bdf8);
  color: #0b1224;
  border: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.play-area {
  display: grid;
  place-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.tap {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 700;
  color: #0b1224;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.tap:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.tap:active {
  transform: scale(0.98);
  box-shadow: 0 10px 20px rgba(74, 222, 128, 0.3);
}
</style>
