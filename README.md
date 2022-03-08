# shiny-yonkoma

シャニマスのWeb4コマ漫画ツイートをまとめたJSONファイル（自動更新）

[![AutoUpdate](https://github.com/arrow2nd/shiny-yonkoma/actions/workflows/auto-update.yml/badge.svg)](https://github.com/arrow2nd/shiny-yonkoma/actions/workflows/auto-update.yml)
[![GitHub license](https://img.shields.io/github/license/arrow2nd/shiny-yonkoma)](https://github.com/arrow2nd/shiny-yonkoma/blob/main/LICENSE)

> 4コマ漫画のまとめサイトを作ろうとしたら、めちゃめちゃ公式にあったのでやめた名残

https://arrow2nd.github.io/shiny-yonkoma/yonkoma.json で最新のものが取得できます。

## データ形式

```ts
type yonkoma = 	{
  category: string;       // カテゴリ名
  title: string;          // タイトル名
  number: number | null;  // 話数
  idols: string[];        // メインのアイドル名
  url: string;            // ツイートURL
  photoUrl: string;       // 画像URL
  publishedUtc: string;   // 投稿日時（UTC / ISO 8601）
};
```

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
