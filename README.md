現在製作の途中です。

# 環境構築手順

1. **リポジトリをクローン**
```
git clone https://github.com/Fukushinaharuto/SiteForestFront.git
```
2. **.env.localファイルの追加**
- frontフォルダの中に.env.localファイルの作成
```
touch ./front/.env.local
```
- .env.localファイルの中に下記を記述
```
NEXT_PUBLIC_API_URL=http://localhost:8003/api
```

3. **Dockerイメージをビルド**
```
docker compose build
```
4. **バックエンドコンテナに入る**
```
docker compose run front /bin/bash
```
5. **依存関係をインストール**
- コンテナ内で下記のコマンドを実行します。
```
npm install
```
- 上記のコードを実行後、コンテナを出ます。
6. **コンテナを起動**
```
docker compose up -d
```

# **構成・概要**
### プロジェクト名
SiteForest

### プロジェクトの目的
プログラミング未経験の方でも、コードを書かずにWebサイトを作成できるようになる。

### 技術スタック
| 言語・フレームワーク・その他 | バージョン |
| -------------------- | ---------- |
| TypeScript           | 5          |
| react                | 18.3.1     |
| Next                 | 15.1.4     |
| Tailwind CSS         | 3.4.1      |
| axios                | 1.7.8      |
| js-cookie            | 3.0.5      |
| react-rnd            | 10.4.13    |
| react-moveable       | 0.56.0     |
| Docker               | 27.4.0     |
| git                  | 2.45.2     |


### ページ

| 機能                   | 説明   | 画像                                                    |
|------------------------|--------|---------------------------------------------------------|
| 新規登録             | ユーザーの新規登録ができます。 | ![新規登録](README-strage/register.png)               |
| ログイン | ユーザーのログインができます。 | ![ログイン](README-strage/login.png)           |
| サイト一覧               | みんなが作成したサイトの一覧を見ることができます。       | ![ホーム](README-strage/home.png)             |
| 自分の作成したサイトの一覧 | 自分が作成したサイトの一覧を見たり、追加・編集・削除することができます。 | ![マイページ](README-strage/home.png)           |
| サイト作成 | サイトを作成することができます。 | ![作成ページ](README-strage/development.png)           |
| プレビュー | サイト作成ページで作成した時の出来栄えを一時的に確認することができます。 | ![プレビューページ](README-strage/preview.png)           |




### 今後作成すること
- cookiesの有効期限が切れたらTokenを削除する
- ログアウト機能
- 色々な要素の追加、例写真など



