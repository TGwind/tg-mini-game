<template>
  <div class="leaderboard">
    <!-- TODO: 实现排行榜组件 -->
  </div>
</template>

<script setup lang="ts">
import type { LeaderboardEntry } from '@/types/api'

// TODO: 定义 props
interface Props {
  entries?: LeaderboardEntry[]
}

const props = withDefaults(defineProps<Props>(), {
  entries: () => []
})

// TODO: 实现排行榜显示逻辑
</script>

<style scoped>
.leaderboard {
  /* TODO: 添加样式 */
}
</style>

