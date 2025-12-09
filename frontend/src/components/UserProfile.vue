<template>
  <div class="user-profile" v-if="user">
    <div class="avatar">{{ user.first_name.charAt(0) }}</div>
    <div>
      <div class="name">{{ user.username ?? user.first_name }}</div>
      <p class="meta">Telegram ID: {{ user.telegram_id }}</p>
      <p class="meta">最佳分数：{{ user.score }}</p>
    </div>
  </div>
  <div v-else class="user-profile empty">正在加载用户信息...</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<style scoped>
.user-profile {
  display: flex;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 14px;
  color: #e5e7eb;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #38bdf8);
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #0b1224;
}

.name {
  font-weight: 700;
  margin-bottom: 4px;
}

.meta {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.4;
}

.empty {
  justify-content: center;
  text-align: center;
}
</style>
