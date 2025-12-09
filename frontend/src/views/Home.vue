<template>
  <div class="home-page">
    <h1>欢迎来到游戏</h1>
    <!-- TODO: 添加首页内容 -->
    <!-- TODO: 添加开始游戏按钮 -->
    <!-- TODO: 显示用户信息 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  // TODO: 初始化页面数据
})

// TODO: 实现开始游戏功能
const startGame = () => {
  // TODO: 跳转到游戏页面
}
</script>

<style scoped>
.home-page {
  /* TODO: 添加样式 */
}
</style>

