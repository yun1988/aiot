# AIoT Dashboard - Smart Home Control System

一個現代化的智能家居控制面板，提供設備管理、環境監控和自動化控制功能。

## 🌐 線上體驗

- **GitHub Pages**: https://yun1988.github.io/aiot/#/dashboard
- **Vercel (推薦)**: https://yun-aiot-dashboard.vercel.app
- **Vercel API**: https://yun-aiot-dashboard.vercel.app/api

## 🚀 功能特色

- 📱 響應式設計，支援桌面和移動設備
- 🏠 多房間設備控制
- 🌡️ 實時環境數據監控
- 🔐 用戶認證系統
- 📊 設備狀態統計
- 🎨 現代化 UI 設計

## 🛠️ 技術棧

- **前端**: React + TypeScript + Vite
- **樣式**: Tailwind CSS
- **圖標**: React Icons
- **HTTP 客戶端**: Axios
- **後端**: JSON Server (開發環境) / Vercel Serverless Functions (生產環境)

## 📦 安裝與運行

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動後端 API (JSON Server) - 僅本地開發和 GitHub Pages
```bash
npx json-server --watch db.json --port 3001
```

### 3. 啟動前端開發服務器
```bash
npm run dev
```

### 4. 訪問應用
- **本地開發**: `http://localhost:5173`
- **GitHub Pages**: `https://yun1988.github.io/aiot/#/dashboard` (需要本地啟動 JSON Server)
- **Vercel**: `https://yun-aiot-dashboard.vercel.app` (內建 API，無需額外設置)

## 🔑 測試帳號

### Vercel 版本 (推薦)
在 Vercel 版本中使用以下帳號：
- **帳號1**: `small2883@hotmail.com` / `123`
- **帳號2**: `small2883@gmail.com` / `123`

### GitHub Pages 版本
需要先啟動本地 JSON Server，然後使用相同的測試帳號。

## 📁 項目結構

```
src/
├── components/          # 可重用組件
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── context/            # React Context
│   └── AuthContext.tsx
├── pages/              # 頁面組件
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── App.tsx
└── main.tsx

api/                    # Vercel Serverless Functions
└── index.js           # API 端點處理

db.json                # 數據庫文件
vercel.json            # Vercel 部署配置
```

## 🚀 部署

### GitHub Pages
項目已配置自動部署到 GitHub Pages，每次推送到 `main` 分支時自動更新。
- **網址**: https://yun1988.github.io/aiot/#/dashboard
- **特點**: 需要本地啟動 JSON Server 才能使用登入功能

### Vercel (推薦)
支援 Vercel 部署，包含 Serverless Functions API。
- **固定網址**: https://yun-aiot-dashboard.vercel.app
- **API 端點**: https://yun-aiot-dashboard.vercel.app/api
- **特點**: 內建完整 API，無需額外設置，支援完整功能

## 📝 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 啟動 JSON Server (僅本地開發)
npx json-server --watch db.json --port 3001

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview

# Vercel 部署
vercel --prod
```

## 🔧 環境配置

- **開發環境**: 使用 `http://localhost:3001` (JSON Server)
- **GitHub Pages**: 使用 `http://localhost:3001` (需要本地啟動 JSON Server)
- **Vercel**: 使用 `/api` (Serverless Functions)

## 🆚 部署版本比較

| 功能 | GitHub Pages | Vercel |
|------|-------------|---------|
| 網址固定性 | ✅ 固定 | ✅ 固定 |
| 登入功能 | ⚠️ 需要本地 JSON Server | ✅ 完整支援 |
| 註冊功能 | ⚠️ 需要本地 JSON Server | ✅ 完整支援 |
| 部署複雜度 | 🟢 簡單 | 🟢 簡單 |
| 推薦使用 | 展示用途 | 生產使用 |
# 自動部署測試 - Thu Jun 26 11:28:24 CST 2025
