<template>
  <div class="leaderboard">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>玩家</th>
          <th>分数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.rank">
          <td>{{ entry.rank }}</td>
          <td>
            <div class="player">
              <div class="avatar">{{ entry.first_name.charAt(0) }}</div>
              <div>
                <div class="name">{{ entry.username ?? entry.first_name }}</div>
                <div class="meta">ID: {{ entry.telegram_id }}</div>
              </div>
            </div>
          </td>
          <td class="score">{{ entry.score }}</td>
        </tr>
        <tr v-if="entries.length === 0">
          <td colspan="3" class="empty">暂无数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { LeaderboardEntry } from '@/types/api'

interface Props {
  entries?: LeaderboardEntry[]
}

withDefaults(defineProps<Props>(), {
  entries: () => []
})
</script>

<style scoped>
.leaderboard {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #e5e7eb;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

th {
  background: rgba(255, 255, 255, 0.05);
  text-align: left;
  color: #cbd5e1;
}

.player {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #38bdf8);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #0b1224;
}

.name {
  font-weight: 700;
}

.meta {
  color: #94a3b8;
  font-size: 12px;
}

.score {
  font-weight: 800;
  color: #38bdf8;
}

.empty {
  text-align: center;
  color: #cbd5e1;
}
</style>
