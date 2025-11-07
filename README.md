# driving-manager

## 概要

個人配達業のために、運行前の安全セルフチェックや、運行開始・終了のメーター値が記録できるWebアプリのフロントエンド。  
Vue.jsを使って実装している。

## 環境構築

### 必要なもの

- Visual Studio Code
- Docker Engine
- Docker Compose
- Dev Containers

### ソースの準備

```bash
git clone git@github.com:qianye-zhesheng/driving-manager.git
```

### Dev Containersで環境を作成

Visual Studio Codeでdriving-managerフォルダを開く。  
Ctrl + Shift + Pでコマンドパレットを開き、`Dev Containers: Open Folder in Container`を実行する

コンテナの生成が終わったら、ターミナル内で以下を実行する。

```bash
npm run copy-env
```

`.env.development` というファイルが生成されるので、AWS Cognitoの各情報や、バックエンドのベースURLを記入する。

Ctrl + Shift + Bでビルドタスクを実行する。

ブラウザで http://localhost:5173/ を開く。

AWS Cognitoで開発用アカウントを作ってログインする。

### Dev Containers内でのGitの利用

事前にホストOS側で、SSHエージェントに鍵を登録しておく必要がある。  
Gitの設定などは自動でコンテナに引き継がれる。

## 単体テスト

テストのアイコンがVSCodeの左側に表示されるので、そこから任意のテストを実行する。

## 本番リリース

mainブランチにマージしてプッシュすれば、Amplifyが自動でデプロイしてくれる。
