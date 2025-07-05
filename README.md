# Aisty - バーチャル試着

「この服、自分に似合うかな？」

オンラインショッピングのそんな悩みを解決するのがAistyです。気になる衣服商品を、自分の写真と合成して購入前にイメージが付きやすくなります！

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
  - 画像は一旦Supabase Storageにアップロードされます。
  - その画像のURLを使って、Next.jsのAPIルート経由でFashn.ai APIを叩いています。
  - Fashn.ai APIが頑張って試着画像を生成してくれるので、結果をポーリングして表示します。

### 2. 認証について

認証にはClerkを採用。

- **公開ページ**: `/`, `/sign-in`, `/sign-up`
- **保護ページ**: 上記以外の全ページ (e.g., `/tryon`)
- **リダイレクト処理**:
  - ログイン済みのユーザーがトップページ (`/`) にアクセスすると、自動で`/tryon`にリダイレクトされます。
  - ロジックは `src/middleware.ts` でやっています。

## 🗺️ 今後のロードマップ

- [ ] `TryOn`ページのUI/UX改善
- [ ] 試着履歴の実装
- [ ] 試着結果のシェア機能

何かアイデアがあれば、気軽にIssueやPull Requestを送ってください！