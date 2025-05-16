# hello-sveltekit

## ローカル動作手順

1. .env.exampleをコピーして.envを作成
2. .envに必要な環境変数を記述
3. 環境変数取り込み `source .env`
4. `npm install`
5. `npm run dev`

## .envの内容について

必須パラメータ
- OPENWEATHER_API_KEY


# プロジェクト構成（概要のみ）

root
├── docs/ 設計書類
├── data/ ローカル動作時のデータ格納用
├── src/ ソースコード


## 実装できなかったもの

- テストコード（vitest、playwright）
