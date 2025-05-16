# hello-sveltekit

## ローカル動作手順

※npmのdevcontainerを用意すると楽です

1. .env.exampleをコピーして.envを作成
2. .envに必要な環境変数を記述
3. `npm install`
4. `npm run dev`

## .envの内容について

必須パラメータ
- OPENWEATHER_API_KEY


# プロジェクト構成（概要のみ）

root
├── docs/ 設計書類
│ ├── 画面設計 Draw.ioで作成した画面デザイン
├── data/ ローカル動作時のデータ格納用
├── src/ ソースコード
│ ├── lib/ ライブラリ
│ ├── routes/ ルーティング

## 採用技術

- Node.js
- SvelteKit(SSR)
- TailwindCSS
- TypeScript
- ESLint、prettier
- vitest、playwright
- Draw.io（画面のデザイン）


## 実装できなかったもの

- テストコード（vitest、playwright）
- Cloudflare Workersにデプロイ
- configなどの整備（ESLint、prettierなど含む）
