# 🎮 Pixel Quiz Game (像素風格益智遊戲) · 🚀 Deployment Active

這是一個充滿復古 8-bit 風格的像素益智遊戲，結合了 **React 前端** 與 **Google Sheets 後端**。

## 🌟 核心特色
- **像素藝術風格 (Pixel Art)**：採用 8-bit 視覺設計，搭配專屬像素按鈕與對話框。
- **全中文化支援**：採用 `Noto Sans TC Black` 字型，確保字體清晰且粗厚。
- **後端整合**：同步 Google Sheets 題目與儲存玩家成績。
- **自動化部署**：內建 GitHub Actions 直接部署至 GitHub Pages（無需 gh-pages 分支）。

## 🌐 部署至 GitHub Pages (重要)

本專案採用最新的 **GitHub Actions** 部署方式，請遵循以下步驟：

1. **設定環境變數 (Secrets)**：
   在 GitHub Repo 的 `Settings > Secrets and variables > Actions` 新增：
   - `VITE_GOOGLE_SCRIPT_URL`: 您的 GAS 網址。
   - `VITE_PASS_THRESHOLD`: 及格門檻。
   - `VITE_QUESTION_COUNT`: 題目數量。

2. **切換部署來源**：
   前往 `Settings > Pages`，將 **Build and deployment > Source** 從 `Deploy from a branch` 改為 **`GitHub Actions`**。

3. **推送代碼**：
   推送至 `main` 分支後，前往 `Actions` 標籤分頁即可看到部署進度。

## 🚀 本地開發
```bash
npm install
npm run dev
```

## 🧪 自動化測試
```bash
npx playwright test tests/mass_simulation.spec.js --headed
```
