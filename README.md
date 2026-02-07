# 🎮 Pixel Quiz Game (像素風格益智遊戲)

這是一個充滿復古 8-bit 風格的像素益智遊戲，結合了 **React 前端** 與 **Google Sheets 後端**，具備自動生成頭像與即時分數紀錄功能。

## 🌟 核心特色

-   **像素藝術風格 (Pixel Art)**：採用 8-bit 視覺設計，搭配專屬像素按鈕與對話框。
-   **智慧頭像系統**：根據玩家 ID 自動生成獨一無二的像素頭像。
-   **響應式設計 (RWD)**：支援桌機與行動裝置，窄螢幕下自動切換為易於點擊的單欄佈局。
-   **全中文化支援**：採用 `Noto Sans TC Black` 字型，確保題目與答案文字清晰且風格統一。
-   **自動化資料後端**：整合 Google Sheets API，實現自動讀取題目與儲存玩家成績。
-   **全自動測試**：內建 Playwright 模擬腳本，可進行大規模使用者並行測試。

## 🛠️ 技術棧

-   **前端框架**：React + Vite
-   **樣式處理**：CSS (Pixel Art Theme) + Styled Components
-   **字型**：Google Fonts (Press Start 2P / Noto Sans TC)
-   **後端/資料庫**：Google Apps Script + Google Sheets
-   **測試工具**：Playwright (自動化 E2E 模擬)

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 環境變數配置
請參考 `.env.example` 建立 `.env` 檔案，填入您的 Google Apps Script URL。

```env
VITE_GOOGLE_SCRIPT_URL=你的GAS部署網址
VITE_PASS_THRESHOLD=3
VITE_QUESTION_COUNT=5
```

### 3. 啟動開發伺服器
```bash
npm run dev
```

## 🌐 部署至 GitHub Pages

本專案已配置 GitHub Actions，當您將代碼推送到 `main` 分支時，系統會自動進行編譯與部署。

### 部署步驟

1. **設定 GitHub Secrets**：
   在您的 GitHub 儲存庫中，前往 `Settings` > `Secrets and variables` > `Actions`，新增以下環境變數（Secrets）：
    - `VITE_GOOGLE_SCRIPT_URL`: 您的 Google Apps Script 部署網址。
    - `VITE_PASS_THRESHOLD`: 及格門檻（預設 3）。
    - `VITE_QUESTION_COUNT`: 題目數量（預設 5）。

2. **推送代碼**：
   將代碼推送至 `main` 分支。
   ```bash
   git add .
   git commit -m "Setup deployment"
   git push origin main
   ```

3. **啟用 GitHub Pages**：
   前往 GitHub 儲存庫的 `Settings` > `Pages`，將 `Build and deployment` > `Source` 設定為 `GitHub Actions`。

4. **查看結果**：
   Action 執行完成後，您可以在 `Settings` > `Pages` 下方看到部署後的網址。

## 🧪 自動化測試

本專案包含模擬大量使用者行為的腳本，可用於壓力測試或邏輯驗證：

```bash
# 執行 Playwright 模擬測試
npx playwright test tests/mass_simulation.spec.js --headed
```

## 📁 資料夾結構
- `src/components`: 包含像素化 UI 組件 (Card, Button, Avatar)。
- `src/services`: 處理與 Google Sheets 的 API 交互。
- `tests/`: 包含 Playwright 自動化測試案例。
- `public/`: 存放靜態資源。

## 📜 專案起源
這是一個實驗性的 AI 協作專案，旨在展示如何快速打造一個具備生產力的全棧小型遊戲應用。
