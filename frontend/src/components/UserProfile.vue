<template>
  <div class="user-profile">
    <!-- TODO: 显示用户头像 -->
    <!-- TODO: 显示用户名 -->
    <!-- TODO: 显示用户分数 -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const user = computed(() => userStore.user)

// TODO: 实现用户信息显示逻辑
</script>

<style scoped>
.user-profile {
  /* TODO: 添加样式 */
}
</style>

