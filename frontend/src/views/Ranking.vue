<template>
  <div class="ranking-page">
    <h1>排行榜</h1>
    <!-- TODO: 显示排行榜列表 -->
    <!-- TODO: 添加分页功能 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { leaderboardApi } from '@/api/leaderboard'
import type { LeaderboardEntry } from '@/types/api'

const leaderboard = ref<LeaderboardEntry[]>([])
const loading = ref(false)

onMounted(() => {
  // TODO: 加载排行榜数据
  loadLeaderboard()
})

const loadLeaderboard = async () => {
  loading.value = true
  try {
    // TODO: 调用 API 获取排行榜
  } catch (error) {
    console.error('Failed to load leaderboard:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ranking-page {
  /* TODO: 添加样式 */
}
</style>

