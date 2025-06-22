# AIoT Dashboard - Smart Home Control System

一個現代化的智能家居控制面板，提供設備管理、環境監控和自動化控制功能。

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
- **後端**: JSON Server (開發環境)

## 📦 安裝與運行

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動後端 API (JSON Server)
```bash
npx json-server --watch db.json --port 3001
```

### 3. 啟動前端開發服務器
```bash
npm run dev
```

### 4. 訪問應用
- 本地開發: `http://localhost:5173`
- GitHub Pages: `https://yun1988.github.io/aiot/#/dashboard`

## 🔑 測試帳號

在 `db.json` 中預設的測試帳號：
- **帳號1**: `small2883@hotmail.com` / `yun19880929`
- **帳號2**: `small2883@gmail.com` / `yun19880929`

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
```

## 🚀 部署

### GitHub Pages
項目已配置自動部署到 GitHub Pages，每次推送到 `main` 分支時自動更新。

### Vercel
支援 Vercel 部署，配置文件: `vercel.json`

## 📝 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 啟動 JSON Server
npx json-server --watch db.json --port 3001

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🔧 環境配置

- **開發環境**: 使用 `http://localhost:3001` (JSON Server)
- **GitHub Pages**: 使用 `http://localhost:3001` (需要本地啟動 JSON Server)
- **Vercel**: 使用 `/api` (Serverless Functions)
