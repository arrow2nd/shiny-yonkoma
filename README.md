# shiny-yonkoma

シャニマスの Web4 コマ漫画ツイートをまとめた JSON ファイル（自動更新）

[![update](https://github.com/arrow2nd/shiny-yonkoma/actions/workflows/update.yml/badge.svg)](https://github.com/arrow2nd/shiny-yonkoma/actions/workflows/update.yml)

> 4 コマ漫画のまとめサイトを作ろうとしたら、めちゃめちゃ公式にあったのでやめた名残

[ここ](docs/yonkoma.json) もしくは、https://arrow2nd.github.io/shiny-yonkoma/yonkoma.json で最新のものが取得できます。

## データ形式

| フィールド   | 型             | 内容                       |
| ------------ | -------------- | -------------------------- |
| category     | string         | カテゴリ名                 |
| title        | string         | タイトル名                 |
| number       | number or null | 話数                       |
| idols        | string[]       | メインのアイドル名         |
| url          | string         | ツイート URL               |
| photoUrl     | string         | 画像 URL                   |
| publishedUtc | string         | 投稿日時（UTC / ISO 8601） |

### サンプル

```json
[
  {
    "category": "web4コマ漫画",
    "title": "アジサイと",
    "number": 42,
    "idols": ["幽谷霧子"],
    "url": "https://twitter.com/imassc_official/status/1018329303660916737",
    "photoUrl": "https://pbs.twimg.com/media/Dh3_BhHU0AAeaDh.jpg",
    "publishedUtc": "2018-07-15T03:00:00.000Z"
  }
]
```
