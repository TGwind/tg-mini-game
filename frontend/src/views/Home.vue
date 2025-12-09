<template>
  <div class="home-page">
    <section class="hero">
      <div>
        <p class="eyebrow">基于 Telegram 的小游戏</p>
        <h1>准备好开始挑战了吗？</h1>
        <p class="subtitle">点击开始按钮即可体验示例游戏，得分越高越好！</p>
        <div class="actions">
          <button class="btn primary" @click="startGame">开始游戏</button>
          <RouterLink class="btn ghost" to="/ranking">查看排行榜</RouterLink>
        </div>
      </div>
      <UserProfile />
    </section>

    <section class="feature-card">
      <h2>玩法简介</h2>
      <p>进入游戏后，点击计分按钮即可累积分数，结束后分数会记录在本地。</p>
      <ul class="feature-list">
        <li>自动识别 Telegram WebApp 用户（无 WebApp 时使用模拟账号）</li>
        <li>简单的 Pinia 状态管理，随时重置和重新开始</li>
        <li>排行榜使用本地假数据，后端准备好后可以直接对接</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import UserProfile from '@/components/UserProfile.vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.ensureUser()
})

const startGame = () => {
  router.push('/game')
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

h1 {
  margin: 6px 0;
  font-size: 32px;
}

.subtitle {
  color: #cbd5e1;
  margin-bottom: 12px;
  line-height: 1.6;
}

.eyebrow {
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #38bdf8;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.btn {
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.btn.primary {
  background: linear-gradient(135deg, #06b6d4, #38bdf8);
  color: #0b1224;
  border: none;
}

.btn.ghost {
  background: transparent;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(56, 189, 248, 0.35);
}

.feature-card {
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.feature-list {
  margin-top: 10px;
  color: #cbd5e1;
  display: grid;
  gap: 8px;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
