# MBTI 自然景觀人格測驗（Vite 版）

這是一個可直接放上 GitHub 的完整 React + Vite 專案。

## 專案內容

- 12 題 MBTI 趣味測驗
- 16 種自然景觀結果頁
- 可返回上一題修改答案
- localStorage 暫存作答進度
- 複製結果按鈕
- 可直接部署到 Vercel、Netlify、GitHub Pages（需再補對應設定）

## 本機啟動

```bash
npm install
npm run dev
```

啟動後，打開終端機顯示的本機網址即可看到畫面。

## 打包

```bash
npm run build
```

打包完成後，產出的檔案會在 `dist` 資料夾。

## 專案結構

```bash
mbti-quiz-vite-project/
├─ public/
├─ src/
│  ├─ components/
│  │  └─ MBTIQuiz.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ index.html
├─ package.json
├─ README.md
└─ vite.config.js
```

## 上傳到 GitHub

1. 先解壓縮這份專案
2. 把整個資料夾內容上傳到你的 GitHub repo
3. 別上傳 `node_modules`
4. 別只上傳 zip 檔本身

## 備註

這份測驗適合活動頁、作品集、品牌互動頁使用；定位是趣味人格測驗，不是正式心理量表。
