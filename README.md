現在製作の途中です。

# 環境構築手順

1. **リポジトリをクローン**
```
git clone https://github.com/Fukushinaharuto/SiteForestFront.git
```
2. **Dockerイメージをビルド**
```
docker compose build
```
3. **バックエンドコンテナに入る**
```
docker compose run front /bin/bash
```
4. **依存関係をインストール**
- コンテナ内で下記のコマンドを実行します。
```
npm install
```
- 上記のコードを実行後、コンテナを出ます。
5. **コンテナを起動**
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



### 今後作成すること
- 要素の削除
- 保存したページの要素の表示(データベースから取り出して)
- cookiesの有効期限が切れたらTokenを削除する
- ログアウト機能
- 要素の重なりの順番入れ替え



