<template>
  <div class="game-board" :class="feedbackClass">
    <div class="board-header">
      <div class="score-display">
        <p class="label">当前分数</p>
        <div class="score">{{ score }}</div>
      </div>
      <div class="meta">
        <div class="pill">时间：{{ timeLeft }}s</div>
        <div class="pill">剩余对数：{{ remainingPairs }}</div>
        <div class="pill">连击：x{{ combo + 1 }}</div>
      </div>
    </div>

    <div class="controls">
      <button class="btn primary" :disabled="isPlaying" @click="startGame">🚀 开始游戏</button>
      <button class="btn" :disabled="!isPlaying" @click="stopGame">⏹ 结束游戏</button>
      <button class="btn" :disabled="!isPlaying" @click="provideHint">✨ 提示 (扫描可连对)</button>
      <button class="btn" :disabled="!isPlaying" @click="shuffleRemaining">🔀 重排剩余块</button>
    </div>

    <div class="grid" :style="gridStyle">
      <button
        v-for="tile in flatTiles"
        :key="tile.id"
        class="tile"
        :class="{
          matched: tile.matched,
          selected: isSelected(tile),
          hinted: isHinted(tile)
        }"
        :disabled="tile.matched || !isPlaying"
        @click="handleTileClick(tile)"
      >
        <span v-if="!tile.matched">{{ tile.symbol }}</span>
      </button>
    </div>

    <div class="helper">
      <div class="helper-row">
        <p>{{ helperText }}</p>
        <span class="hint-pill">S 开始/结束 · H 提示 · R 重排</span>
      </div>
      <div class="timers">
        <div class="progress" :class="{ warning: isTimeLow }">
          <div class="bar" :style="progressStyle"></div>
        </div>
        <div class="streak-card" :class="streakTone">
          <div class="streak-header">
            <span>连击能量</span>
            <span class="streak-count" :class="{ flash: streakFlash }">x{{ combo + 1 }}</span>
          </div>
          <div class="streak-track">
            <div class="streak-bar" :style="streakStyle"></div>
          </div>
          <p class="streak-note">{{ streakNote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Tile {
  id: number
  symbol: string
  row: number
  col: number
  matched: boolean
}

interface ProgressPayload {
  timeLeft: number
  pairsLeft: number
  combo: number
  message: string
}

const props = defineProps<{ score: number }>()

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'stop'): void
  (e: 'score', value: number): void
  (e: 'progress', value: ProgressPayload): void
}>()

const rows = 6
const cols = 6
const timeLimit = 90
const symbols = ['🐱', '🐶', '🐼', '🐰', '🐸', '🐥', '🐙', '🦊', '🐻', '🐧', '🐯', '🦁']

const board = ref<Tile[][]>([])
const selected = ref<Tile[]>([])
const hintedIds = ref<number[]>([])
const combo = ref(0)
const timeLeft = ref(timeLimit)
const helperText = ref('点击开始生成棋盘并挑战限时配对！')
const isPlaying = ref(false)
const feedbackClass = ref<'neutral' | 'success' | 'fail'>('neutral')
const streakFlash = ref(false)
let timer: number | undefined
let idCounter = 0

const flatTiles = computed(() => board.value.flat())
const remainingPairs = computed(() => flatTiles.value.filter((t) => !t.matched).length / 2)

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols}, minmax(46px, 1fr))`,
  gridTemplateRows: `repeat(${rows}, minmax(46px, 1fr))`
}))

const progressStyle = computed(() => ({
  width: `${Math.max(0, (timeLeft.value / timeLimit) * 100)}%`
}))

const isTimeLow = computed(() => timeLeft.value <= 15)
const comboStreakTarget = 6
const streakStyle = computed(() => ({
  width: `${Math.min(100, ((combo.value + 1) / comboStreakTarget) * 100)}%`
}))
const streakTone = computed(() => {
  if (combo.value + 1 >= comboStreakTarget) return 'surge'
  if (combo.value + 1 >= comboStreakTarget / 2) return 'warm'
  return 'cool'
})
const streakNote = computed(() => {
  if (combo.value + 1 >= comboStreakTarget) return '能量溢出！额外奖励与时间加成已经触发。'
  if (combo.value + 1 >= comboStreakTarget / 2) return '保持节奏，再连几对就能获得加时奖励。'
  return '稳扎稳打，连续命中提升倍率并解锁惊喜效果。'
})

const emitProgress = (message: string) => {
  emit('progress', {
    timeLeft: timeLeft.value,
    pairsLeft: remainingPairs.value,
    combo: combo.value,
    message
  })
}

const resetBoard = () => {
  const pairCount = (rows * cols) / 2
  const pool: string[] = []

  for (let i = 0; i < pairCount; i++) {
    pool.push(symbols[i % symbols.length])
  }

  const doubled = [...pool, ...pool]
  shuffle(doubled)

  idCounter = 0
  const tiles: Tile[][] = []
  for (let r = 0; r < rows; r++) {
    const row: Tile[] = []
    for (let c = 0; c < cols; c++) {
      const symbol = doubled[r * cols + c]
      row.push({
        id: idCounter++,
        symbol,
        row: r,
        col: c,
        matched: false
      })
    }
    tiles.push(row)
  }

  board.value = tiles
  selected.value = []
  hintedIds.value = []
  emitProgress('棋盘已刷新，开始配对！')
}

const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

const startTimer = () => {
  clearTimer()
  timer = window.setInterval(() => {
    if (timeLeft.value <= 0) {
      stopGame('时间结束，看看能否更快！')
      return
    }
    timeLeft.value -= 1
    emitProgress(helperText.value)
  }, 1000)
}

const clearTimer = () => {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

const startGame = () => {
  resetBoard()
  timeLeft.value = timeLimit
  combo.value = 0
  feedbackClass.value = 'neutral'
  helperText.value = '快速找到可连通的两块，获得连击加成！'
  isPlaying.value = true
  emit('score', 0)
  emit('start')
  startTimer()
}

const stopGame = (message = '已结束本局') => {
  isPlaying.value = false
  clearTimer()
  selected.value = []
  feedbackClass.value = 'neutral'
  helperText.value = message
  emitProgress(message)
  emit('stop')
}

const isSelected = (tile: Tile) => selected.value.some((t) => t.id === tile.id)
const isHinted = (tile: Tile) => hintedIds.value.includes(tile.id)

const handleTileClick = (tile: Tile) => {
  if (!isPlaying.value || tile.matched) return
  hintedIds.value = []

  if (isSelected(tile)) {
    selected.value = selected.value.filter((t) => t.id !== tile.id)
    return
  }

  selected.value.push(tile)

  if (selected.value.length === 2) {
    const [first, second] = selected.value
    if (first.symbol === second.symbol && canConnect(first, second)) {
      handleMatch(first, second)
    } else {
      combo.value = 0
      feedbackClass.value = 'fail'
      helperText.value = '未能连线，尝试其他组合！'
      emitProgress(helperText.value)
      selected.value = []
      window.setTimeout(() => {
        feedbackClass.value = 'neutral'
      }, 450)
    }
  }
}

const handleMatch = (a: Tile, b: Tile) => {
  board.value[a.row][a.col].matched = true
  board.value[b.row][b.col].matched = true
  selected.value = []
  combo.value += 1
  feedbackClass.value = 'success'
  streakFlash.value = true

  const gained = 20 + combo.value * 5
  const nextScore = props.score + gained
  helperText.value = `连接成功！连击 +${combo.value}, 获得 ${gained} 分。`
  emit('score', nextScore)
  emitProgress(helperText.value)

  if ((combo.value + 1) % comboStreakTarget === 0) {
    const bonus = 6
    timeLeft.value = Math.min(timeLimit, timeLeft.value + bonus)
    helperText.value = `连击爆发！额外加时 +${bonus}s，保持气势！`
    emitProgress(helperText.value)
  }

  window.setTimeout(() => {
    feedbackClass.value = 'neutral'
    streakFlash.value = false
  }, 500)

  if (remainingPairs.value === 0) {
    stopGame('恭喜消除全部图标！')
  }
}

const provideHint = () => {
  if (!isPlaying.value) return
  const pair = findFirstConnectablePair()
  if (!pair) {
    shuffleRemaining('未找到可连的组合，已自动重排避免卡局。')
    return
  }

  hintedIds.value = [pair[0].id, pair[1].id]
  helperText.value = '黄色高亮的是当前可连接的一对图标。'
  emitProgress(helperText.value)
}

const shuffleRemaining = (message?: string) => {
  if (!isPlaying.value) return
  const remaining = flatTiles.value.filter((t) => !t.matched)
  const values = remaining.map((t) => t.symbol)
  shuffle(values)
  remaining.forEach((tile, idx) => {
    tile.symbol = values[idx]
  })
  selected.value = []
  hintedIds.value = []
  helperText.value = message ?? '剩余块已重排，新的路线等你发现！'
  emitProgress(helperText.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  const targetTag = (event.target as HTMLElement | null)?.tagName?.toLowerCase?.() ?? ''
  if (targetTag === 'input' || targetTag === 'textarea') return

  if (key === 's') {
    event.preventDefault()
    if (isPlaying.value) {
      stopGame('手动结束，休息一下再战！')
    } else {
      startGame()
    }
  }

  if (!isPlaying.value) return

  if (key === 'h') {
    event.preventDefault()
    provideHint()
  }

  if (key === 'r') {
    event.preventDefault()
    shuffleRemaining('快捷键重排完成，寻找新路线！')
  }
}

const findFirstConnectablePair = () => {
  const candidates = flatTiles.value.filter((t) => !t.matched)
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const a = candidates[i]
      const b = candidates[j]
      if (a.symbol !== b.symbol) continue
      if (canConnect(a, b)) {
        return [a, b] as const
      }
    }
  }
  return null
}

const canConnect = (a: Tile, b: Tile) => {
  const extendedRows = rows + 2
  const extendedCols = cols + 2
  const grid = Array.from({ length: extendedRows }, () => Array(extendedCols).fill(0))

  flatTiles.value.forEach((tile) => {
    if (tile.matched) return
    const r = tile.row + 1
    const c = tile.col + 1
    grid[r][c] = 1
  })

  grid[a.row + 1][a.col + 1] = 0
  grid[b.row + 1][b.col + 1] = 0

  const start = { r: a.row + 1, c: a.col + 1 }
  const target = { r: b.row + 1, c: b.col + 1 }
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]

  const visited = Array.from({ length: extendedRows }, () =>
    Array.from({ length: extendedCols }, () => Array(4).fill(3))
  )

  const queue: Array<{ r: number; c: number; dir: number; turns: number }> = []
  for (let d = 0; d < 4; d++) {
    visited[start.r][start.c][d] = 0
    queue.push({ r: start.r, c: start.c, dir: d, turns: 0 })
  }

  while (queue.length) {
    const node = queue.shift()!
    if (node.turns > 2) continue
    const nr = node.r + dirs[node.dir][0]
    const nc = node.c + dirs[node.dir][1]

    if (nr < 0 || nr >= extendedRows || nc < 0 || nc >= extendedCols) {
      continue
    }

    if (grid[nr][nc] === 1 && !(nr === target.r && nc === target.c)) continue

    if (nr === target.r && nc === target.c) {
      return true
    }

    const currentTurns = node.turns
    if (visited[nr][nc][node.dir] <= currentTurns) continue
    visited[nr][nc][node.dir] = currentTurns

    for (let nd = 0; nd < 4; nd++) {
      const extraTurn = nd === node.dir ? 0 : 1
      const totalTurns = currentTurns + extraTurn
      if (totalTurns > 2) continue
      if (visited[nr][nc][nd] > totalTurns) {
        visited[nr][nc][nd] = totalTurns
        queue.push({ r: nr, c: nc, dir: nd, turns: totalTurns })
      }
    }
  }

  return false
}

onBeforeUnmount(() => {
  clearTimer()
  window.removeEventListener('keydown', handleKeydown)
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

</script>

<style scoped>
.game-board {
  display: grid;
  gap: 18px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(8, 47, 73, 0.7));
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}

.game-board.success {
  box-shadow: 0 14px 40px rgba(74, 222, 128, 0.25), 0 0 0 1px rgba(74, 222, 128, 0.18);
  animation: pulse 0.6s ease;
}

.game-board.fail {
  box-shadow: 0 14px 40px rgba(248, 113, 113, 0.25), 0 0 0 1px rgba(248, 113, 113, 0.18);
  animation: shake 0.35s ease;
}

.board-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
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
  text-shadow: 0 0 18px rgba(56, 189, 248, 0.4);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  background: rgba(255, 255, 255, 0.06);
  padding: 8px 12px;
  border-radius: 10px;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.04);
  color: #e5e7eb;
  letter-spacing: 0.2px;
  position: relative;
  overflow: hidden;
}

.btn.primary {
  background: linear-gradient(135deg, #06b6d4, #38bdf8);
  color: #0b1224;
  border: none;
  box-shadow: 0 10px 20px rgba(56, 189, 248, 0.35);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15), transparent 50%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.btn:hover:not(:disabled)::after {
  opacity: 1;
}

.grid {
  display: grid;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.08);
}

.tile {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  font-size: 24px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 0.12s ease, box-shadow 0.25s ease, background 0.2s ease, border-color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.tile:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  border-color: rgba(56, 189, 248, 0.3);
}

.tile.selected {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

.tile.hinted {
  border-color: #fbbf24;
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.35);
}

.tile.matched {
  background: rgba(34, 197, 94, 0.2);
  color: transparent;
  cursor: default;
  border-style: dashed;
  filter: saturate(1.2);
}

.tile::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.14), transparent 55%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.tile:hover::before {
  opacity: 1;
}

.helper {
  display: grid;
  gap: 8px;
  color: #cbd5e1;
}

.helper-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.hint-pill {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
  border: 1px solid rgba(59, 130, 246, 0.25);
  letter-spacing: 0.2px;
}

.timers {
  display: grid;
  gap: 10px;
}

.progress {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  overflow: hidden;
}

.progress.warning {
  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.25), 0 4px 16px rgba(248, 113, 113, 0.25);
}

.bar {
  height: 100%;
  background: linear-gradient(135deg, #22c55e, #38bdf8);
  transition: width 0.25s ease;
}

.streak-card {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 12px;
  display: grid;
  gap: 6px;
}

.streak-card.cool {
  box-shadow: 0 8px 20px rgba(56, 189, 248, 0.12);
}

.streak-card.warm {
  box-shadow: 0 8px 22px rgba(249, 115, 22, 0.18);
  border-color: rgba(249, 115, 22, 0.28);
}

.streak-card.surge {
  box-shadow: 0 10px 26px rgba(34, 197, 94, 0.22);
  border-color: rgba(34, 197, 94, 0.32);
}

.streak-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e2e8f0;
}

.streak-count {
  font-weight: 800;
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
}

.streak-count.flash {
  animation: pop 0.45s ease;
}

.streak-track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.streak-bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #a855f7, #38bdf8);
  background-size: 200% 100%;
  animation: slide 2s linear infinite;
  transition: width 0.25s ease;
}

.streak-note {
  font-size: 12px;
  color: #cbd5e1;
}

@media (max-width: 640px) {
  .score {
    font-size: 36px;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  50% {
    transform: translateX(6px);
  }
  75% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slide {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
</style>
