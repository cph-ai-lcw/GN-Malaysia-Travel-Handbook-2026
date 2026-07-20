# 國能馬來西亞員旅手帳 2026 — v3.1.0 Island Stable

可直接部署至 GitHub Pages 的模組化靜態 PWA，無後端、無 Firebase。

## 已完成功能

- Hero Banner、出發倒數與浮動快速 Icon
- 奶油白、海洋藍、珊瑚橘與陽光黃的南洋海島明亮介面
- 首頁今日行程、接送、最新公告與 LINE 群組
- Day 1–Day 5 時間軸、餐食、住宿與景點深度導覽
- Lexis／Sunway 飯店照片與主要景點專屬照片
- 32 位團員姓名搜尋、去回程機位、Lexis／Sunway 分房與同房者
- 馬來西亞氣候詳細打包清單與 Type G 插頭圖
- Wallet 記帳、RM ↔ NTD 雙向換算與分類統計
- 大紅花水上／陸上／館內自費項目
- 亞羅街、Sunway Velocity Mall、Fipper、Padini、HOOGA、Beryl’s、Oriental Kopi
- FAQ、MDAC、領隊、旅行社、飯店與緊急電話
- 入境備用財力提醒：至少 NTD 15,000 等值，可由現金、卡片與可查驗銀行餘額搭配
- 繁體中文／越南文兩種獨立模式（自動記住選擇）
- 內建 Noto Sans TC 中越字體，離線狀態仍可正確顯示
- LocalStorage 儲存團員、語言、清單、匯率與帳目
- PWA 離線快取與 GitHub Pages 相容相對路徑

## GitHub Pages

1. 將此資料夾的「內容」放入 Repository 根目錄。
2. Commit 後 Push 至 `main` 分支。
3. GitHub Repository → Settings → Pages。
4. Source 選擇 `Deploy from a branch`，Branch 選 `main` / `(root)`。

## 離線更新

新版 Push 後，開啟網頁並等待快取更新。若手機仍顯示舊版，請完全關閉後重新開啟。

## 隱私

介面不顯示護照號碼、生日、身分證、訂位代碼或票號。若 Repository 設為公開，姓名、機位與房間分配檔案仍可被讀取，請依公司隱私政策決定部署方式。
