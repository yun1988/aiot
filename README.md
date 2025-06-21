# AIOT - Modern Authentication System

一個使用 Vite + React + TypeScript + Tailwind CSS 構建的現代化認證系統。

## 🚀 技術棧

- **Vite** - 快速的前端建構工具
- **React 18** - 使用者介面函式庫
- **TypeScript** - 靜態型別檢查
- **Tailwind CSS** - 實用優先的 CSS 框架
- **React Router DOM** - 客戶端路由

## 📁 專案架構

```
aiot/
├── node_modules/                  # npm 安裝的套件
├── public/                       # 靜態資源 (Vite 預設)
├── src/
│   ├── pages/                    # 各頁面元件 (路由頁面)
│   │   ├── Home.tsx              # 登入後的首頁
│   │   ├── Login.tsx             # 登入頁面
│   │   └── Register.tsx          # 註冊頁面
│   ├── context/                  # React Context 相關檔案
│   │   └── AuthContext.tsx       # 認證狀態管理 (登入/登出/註冊)
│   ├── App.tsx                   # 主要應用元件，路由設定
│   ├── main.tsx                  # React app 入口，渲染 App 元件
│   └── index.css                 # Tailwind CSS 的入口樣式檔
├── tailwind.config.ts            # Tailwind CSS 設定檔 (指定掃描檔案路徑)
├── postcss.config.cjs            # PostCSS 設定，用來處理 Tailwind
├── tsconfig.json                 # TypeScript 設定
├── vite.config.ts                # Vite 設定，包含 React 插件
├── package.json                  # npm 腳本、套件依賴列表
└── README.md                     # 專案說明文件
```

## 🛠️ 安裝與運行

### 前置需求
- Node.js (版本 16 或以上)
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```
開發伺服器將在 `http://localhost:5173` 啟動

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```


# 修改代碼後
```bash
git add .
git commit -m "你的更新描述"
git push
```
# 部署到GitHub Pages
```bash
npm run deploy
```

## 📋 功能特色

- ✅ **使用者認證系統**
  - 登入功能
  - 註冊功能
  - 登出功能
  - 認證狀態管理

- ✅ **路由系統**
  - 客戶端路由
  - 受保護的路由
  - 頁面導航

- ✅ **現代化 UI**
  - 響應式設計
  - Tailwind CSS 樣式
  - 現代化使用者介面

- ✅ **TypeScript 支援**
  - 完整的型別檢查
  - 更好的開發體驗
  - 程式碼品質保證

## 🔧 主要檔案說明

### 核心檔案
- `src/main.tsx` - 應用程式入口點
- `src/App.tsx` - 主要應用元件，包含路由設定
- `index.html` - HTML 模板

### 頁面元件
- `src/pages/Home.tsx` - 首頁（需要登入）
- `src/pages/Login.tsx` - 登入頁面
- `src/pages/Register.tsx` - 註冊頁面

### 狀態管理
- `src/context/AuthContext.tsx` - 認證狀態管理 Context

### 樣式檔案
- `src/index.css` - 全域樣式和 Tailwind CSS 導入
- `tailwind.config.ts` - Tailwind CSS 配置
- `postcss.config.cjs` - PostCSS 配置

## 🎨 自訂設定

### Tailwind CSS 配置
編輯 `tailwind.config.ts` 來自訂 Tailwind CSS 設定：
- 顏色主題
- 字體設定
- 間距配置
- 響應式斷點

### Vite 配置
編輯 `vite.config.ts` 來自訂 Vite 設定：
- 插件配置
- 建置選項
- 開發伺服器設定

## 📝 開發指南

### 新增頁面
1. 在 `src/pages/` 目錄下創建新的 `.tsx` 檔案
2. 在 `src/App.tsx` 中新增對應的路由
3. 如果需要認證，使用 `ProtectedRoute` 元件包裝

### 新增樣式
- 使用 Tailwind CSS 類別
- 在 `src/index.css` 中新增自訂 CSS
- 使用 CSS 模組或 styled-components（需要額外安裝）

### 狀態管理
- 使用 `AuthContext` 管理認證狀態
- 對於複雜狀態，考慮使用 Redux 或 Zustand

## 🤝 貢獻

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

此專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- [Vite](https://vitejs.dev/) - 快速的前端建構工具
- [React](https://reactjs.org/) - 使用者介面函式庫
- [Tailwind CSS](https://tailwindcss.com/) - 實用優先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集 