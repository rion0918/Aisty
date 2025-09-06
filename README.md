# Aisty - バーチャル試着

「この服、自分に似合うかな？」

オンラインショッピングのそんな悩みを解決するのが Aisty です。気になる衣服商品を、自分の写真と合成して購入前にイメージが付きやすくなります！

## 🚀 技術スタック

このアプリは、以下の技術スタックで構築されています。

- **Framework**: [Next.js](https://nextjs.org/)
- **UI**: [Chakra UI](https://chakra-ui.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Storage**: [Supabase Storage](https://supabase.com/docs/guides/storage)
- **Virtual Try-on API**: [Fashn.ai](https://fashn.ai/)
- **Icons**: `react-icons`

### 🏗️ 技術構成図

アプリ全体を図にまとめました。  
[Excalidraw で開く](https://excalidraw.com/#json=1yHvHB8zI6ULGjSwJpfQ7,x9M59OlZtNZXd0FaqrChFg)

## ✨ 主な機能

### 1. バーチャル試着ページ (`/tryon`)

このアプリのメイン機能です！ログインしたユーザーだけがアクセスできます。

- **使い方**:
  1.  自分の全身写真（`human_image`）をアップロード
  2.  試着したい服の画像（`garment_image`）をアップロード
  3.  生成ボタンをクリック！
- **裏側の仕組み**:
  - 画像は一旦 Supabase Storage にアップロードされます。
  - その画像の URL を使って、Next.js の API ルート経由で Fashn.ai API を叩いています。
  - Fashn.ai API が頑張って試着画像を生成してくれるので、結果をポーリングして表示します。

### 2. 認証について

認証には Clerk を採用。

- **公開ページ**: `/`, `/sign-in`, `/sign-up`
- **保護ページ**: 上記以外の全ページ (e.g., `/tryon`)
- **リダイレクト処理**:
  - ログイン済みのユーザーがトップページ (`/`) にアクセスすると、自動で`/tryon`にリダイレクトされます。
  - ロジックは `src/middleware.ts` でやっています。

## 🔒 プライバシー: 履歴の削除と自動パージ

本サービスでは、ユーザー自身による履歴削除と、プライバシー配慮のための「3 日後に自動削除」を提供します。

- ユーザー削除: Try-on ページの履歴カードに「削除」ボタンと「すべて削除」ボタンを用意しています。
  - API: `DELETE /api/history?id=<row_id>` または `DELETE /api/history?all=true`
- 自動削除（3 日）: `GET /api/history/purge` をスケジュール実行します。
  - 削除対象: `tryon_history.created_at` が実行時点から 3 日以上前の行（`<= 3日`）
  - 実装: `aisty-app/src/app/api/history/purge/route.ts`

### 有効化手順（本番環境）

1. 環境変数の設定

- `CRON_SECRET`: 任意の長いランダム文字列を設定（例: `openssl rand -hex 32`）。

2. スケジューラ設定（例: Vercel Cron）

- スケジュール（例）: 毎日 03:00 JST → `0 18 * * *`（UTC 基準。JST は UTC+9）
- エンドポイント: `GET /api/history/purge?key=<CRON_SECRET>`
  - Vercel Cron はカスタムヘッダを付けられないため、`?key=...` のクエリで共有秘密鍵を渡します。
- 期待レスポンス: `{ deleted: <削除件数>, before: <しきい値ISO> }`

## 🗺️ 今後のロードマップ

- [ ] `TryOn`ページの UI/UX 改善
- [ ] 試着履歴の実装
- [ ] 試着結果のシェア機能

何かアイデアがあれば、気軽に Issue や Pull Request を送ってください！
