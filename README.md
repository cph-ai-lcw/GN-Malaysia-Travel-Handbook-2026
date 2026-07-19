# GN Malaysia Travel Handbook 2026 — v2.0 Production

單一 HTML、可直接部署至 GitHub Pages。

## 正式版功能
1. 首頁
2. PLAN
3. ROOM
4. SEAT
5. CHECKLIST
6. WALLET
7. 美食・購物
8. INFO

## 資料來源
- PLAN：正式旅行社 PDF
- ROOM／SEAT：最新版 Excel
- LINE：正式 LINE 群組 QR Code
- 敏感資料未放入網站：身分證、護照、生日、票號、訂位代號

## 部署
將 `index.html` 覆蓋 GitHub Repository 根目錄後 Commit、Push。

## 離線說明
本版本所有程式、資料與圖片均內嵌在單一 HTML，已載入的頁面不依賴外部資源。
受限於單一檔案規格，未另外配置 Service Worker；完整的瀏覽器安裝型離線 PWA 需額外的 `sw.js`。
