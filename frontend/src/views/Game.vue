<template>
  <div class="game-page">
    <h1>游戏页面</h1>
    <!-- TODO: 添加游戏画布/区域 -->
    <!-- TODO: 显示当前分数 -->
    <!-- TODO: 添加游戏控制按钮 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

onMounted(() => {
  // TODO: 初始化游戏
  gameStore.startGame()
})

onUnmounted(() => {
  // TODO: 清理游戏资源
})

// TODO: 实现游戏逻辑
</script>

<style scoped>
.game-page {
  /* TODO: 添加样式 */
}
</style>

