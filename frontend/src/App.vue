<template>
  <div id="app">
    <header class="app-header">
      <div class="brand">TG Mini Game</div>
      <nav class="nav-links">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/game">游戏</RouterLink>
        <RouterLink to="/ranking">排行榜</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initTelegramWebApp } from '@/utils/telegram'

onMounted(() => {
  initTelegramWebApp()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  color: #e5e7eb;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(15, 23, 42, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
}

.brand {
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a.router-link-active {
  color: #38bdf8;
}

.nav-links a:hover {
  color: #f8fafc;
}

.app-main {
  padding: 24px;
}
</style>
