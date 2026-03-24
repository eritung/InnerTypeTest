# Nature MBTI Quiz

一個可直接部署到 GitHub Pages 的 React + Vite 心理測驗網站。

## 特色
- 12 題 MBTI 心理測驗
- 16 種自然景觀結果頁
- 手機、桌機皆可閱讀
- 可複製測驗結果文字
- 已附 GitHub Actions 自動部署設定

## 本機啟動

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

## 部署到 GitHub Pages

1. 把整包專案上傳到 GitHub Repository
2. 到 GitHub 的 `Settings > Pages`
3. 在 `Build and deployment` 選擇 `GitHub Actions`
4. push 到 `main` 分支後，會自動部署

## 可調整位置
- 題目資料：`src/data/quizData.js`
- 結果文案：`src/data/quizData.js`
- 網站樣式：`src/styles.css`
- 主程式：`src/App.jsx`

## 備註
這個版本是依照原始參考檔的整體視覺語感延伸製作，保留奶油色背景、圓角卡片、柔和陰影、DM Serif / DM Sans 的排版氛圍。
