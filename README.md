# Stylish Portfolio Site

UNIEL サイトからインスパイアされた、モダンでおしゃれなポートフォリオサイトです。パララックス効果とスムーズなアニメーションを特徴とする軽量な静的サイトです。

## 🚀 特徴

- **パララックス効果**: スクロールに連動した美しい視覚効果
- **軽量設計**: Astro による静的サイト生成で高速ロード
- **レスポンシブデザイン**: あらゆるデバイスで最適な表示
- **モダンな UI**: UNIEL サイトを参考にしたクリーンなデザイン
- **アクセシビリティ対応**: WAI ガイドラインに準拠
- **高パフォーマンス**: Intersection Observer API による最適化

## 🛠️ 技術スタック

- **フレームワーク**: [Astro 4.0](https://astro.build/)
- **言語**: TypeScript
- **スタイル**: Vanilla CSS (CSS Variables)
- **アニメーション**: Intersection Observer API + CSS Transforms
- **デプロイ**: Cloudflare Pages 対応

## 📦 セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/stylish-portfolio-site.git
cd stylish-portfolio-site

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run check
```

## 🎨 カスタマイズ

### カラーパレット

`src/styles/global.css`の CSS 変数を編集してカラーテーマを変更できます：

```css
:root {
  --color-primary: #000000;
  --color-secondary: #666666;
  --color-background: #ffffff;
  /* ... その他の色設定 */
}
```

### パララックス効果

要素にデータ属性を追加するだけで簡単にパララックス効果を適用できます：

```html
<div data-parallax data-parallax-speed="0.5" data-parallax-direction="up">
  パララックス要素
</div>
```

**オプション:**

- `data-parallax-speed`: 移動速度 (-2.0 ～ 2.0)
- `data-parallax-direction`: 方向 (`up`, `down`, `left`, `right`)
- `data-parallax-offset`: オフセット値

### フェードインアニメーション

```html
<div data-reveal data-reveal-delay="200">スクロールで表示される要素</div>
```

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px 以上
- **タブレット**: 768px ～ 1199px
- **モバイル**: 767px 以下

## ⚡ パフォーマンス最適化

- 静的サイト生成による高速ロード
- Intersection Observer API による効率的なスクロール処理
- CSS Variables による軽量なスタイル管理
- 画像遅延読み込み対応
- `prefers-reduced-motion`によるアクセシビリティ配慮

## 🚀 デプロイ

### Cloudflare Pages

1. GitHub リポジトリと連携
2. ビルドコマンド: `npm run build`
3. 出力ディレクトリ: `dist`

### その他のプラットフォーム

- **Netlify**: `npm run build` → `dist`
- **Vercel**: `npm run build` → `dist`
- **GitHub Pages**: `npm run build` → `dist`

## 📁 ディレクトリ構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── Header.astro    # ヘッダーナビゲーション
│   └── Hero.astro      # ヒーローセクション
├── layouts/            # レイアウトテンプレート
│   └── Layout.astro    # メインレイアウト
├── pages/              # ページファイル
│   └── index.astro     # トップページ
├── scripts/            # TypeScriptファイル
│   └── parallax.ts     # パララックス効果の実装
└── styles/             # スタイルファイル
    └── global.css      # グローバルスタイル
```

## 🎯 SEO 対応

- メタタグの最適化
- Open Graph 対応
- Twitter Card 対応
- 構造化データ対応
- Canonical URL 設定

## 🔧 ブラウザ対応

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📄 ライセンス

MIT License

## 🙏 謝辞

デザインインスピレーション: [UNIEL](https://uniel.jp/)

---

**作成者**: Creative Portfolio Team  
**バージョン**: 1.0.0  
**最終更新**: 2025 年 1 月
