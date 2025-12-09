# Telegram Mini App 游戏

一个基于 Vue 3 + FastAPI 的 Telegram Mini App 游戏框架。

## 项目结构

```
.
├── frontend/          # Vue 3 + TypeScript 前端
├── backend/           # FastAPI 后端
├── .gitignore
└── README.md
```

## 技术栈

### 前端
- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia (状态管理)
- Axios (HTTP 客户端)
- Telegram WebApp SDK

### 后端
- Python 3.10+
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (数据验证)
- Uvicorn (ASGI 服务器)

## 功能模块

- ✅ Telegram 用户认证
- ✅ 用户信息管理
- ✅ 游戏分数保存
- ✅ 排行榜系统
- ✅ 数据库存储

## 安装步骤

### 前端安装

```bash
cd frontend
npm install
```

### 后端安装

```bash
cd backend
pip install -r requirements.txt
```

## 配置

### 前端配置

在 `frontend/` 目录下创建 `.env.development` 和 `.env.production` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 后端配置

在 `backend/` 目录下创建 `.env` 文件：

```env
DATABASE_URL=sqlite:///./game.db
TELEGRAM_BOT_TOKEN=your_bot_token_here
SECRET_KEY=your_secret_key_here
```

## 运行

### 启动后端服务

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 启动前端开发服务器

```bash
cd frontend
npm run dev
```

## 开发指南

### 项目架构

- 前端采用 MVVM 架构，使用 Pinia 进行状态管理
- 后端采用分层架构：API Layer -> Service Layer -> Model Layer
- 前后端通过 RESTful API 进行通信

### API 接口

- `POST /api/auth/verify` - 验证 Telegram 用户
- `GET /api/user/profile` - 获取用户信息
- `POST /api/game/save-score` - 保存游戏分数
- `GET /api/leaderboard` - 获取排行榜

## 部署

### 前端部署

```bash
cd frontend
npm run build
```

### 后端部署

使用 Docker 或直接部署到支持 Python 的服务器。

## 许可证

MIT

