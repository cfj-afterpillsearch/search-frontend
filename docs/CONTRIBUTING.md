# コントリビューションガイド

ご協力いただきありがとうございます！

## 開発の流れ

### 1. ブランチの作成

- ブランチ名に特別なルールはありません
- 分かりやすい名前をつけていただければ ok です（例：`fix-search-bug`, `add-new-feature`）

### 2. 開発・コミット

- 機能開発やバグ修正を行ってください
- コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の形式に従ってください

#### コミットメッセージの形式

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

#### type の種類

- `feat`: 新機能の追加
- `fix`: バグ修正
- `docs`: ドキュメントの変更
- `style`: コードスタイルやフォーマットの変更
- `refactor`: コードの構造やリファクタリングに関する変更
- `test`: テストコードの追加や変更
- `chore`: 運用保守に関連する雑多な作業やタスク
- `revert`: コミットの取り消し

#### 例

```
feat: 検索機能にフィルターを追加

- 都道府県による絞り込み機能を実装
- 検索結果の表示件数を調整

Closes #123
```

### 3. Pull Request の作成

- 開発が完了したら、Pull Request を作成してください
- Reviewers には、[CODEOWNERS](/.github/CODEOWNERS)が自動でアサインされます

### 4. マージ

- レビューを経て、問題がなければマージされます
- マージ後、自動的にデプロイが実行されます
