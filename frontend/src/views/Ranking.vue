<template>
  <div class="ranking-page">
    <section class="panel">
      <header class="panel-header">
        <div>
          <p class="eyebrow">排行榜</p>
          <h2>看看谁是最高分！</h2>
        </div>
        <button class="btn ghost" :disabled="loading" @click="loadLeaderboard">
          {{ loading ? '加载中...' : '刷新列表' }}
        </button>
      </header>

      <Leaderboard :entries="leaderboard" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { leaderboardApi } from '@/api/leaderboard'
import type { LeaderboardEntry } from '@/types/api'
import Leaderboard from '@/components/Leaderboard.vue'

const leaderboard = ref<LeaderboardEntry[]>([])
const loading = ref(false)

onMounted(() => {
  loadLeaderboard()
})

const loadLeaderboard = async () => {
  loading.value = true
  try {
    const response = await leaderboardApi.getLeaderboard()
    leaderboard.value = response.data.items
  } catch (error) {
    console.error('Failed to load leaderboard:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ranking-page {
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

.eyebrow {
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #38bdf8;
  font-weight: 600;
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
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
