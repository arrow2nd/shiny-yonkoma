import { idols } from '../data/idols.js'

/**
 * ツイート文からエピソード情報を抽出
 * @param {string} text ツイート文
 * @returns エピソード情報
 */
export function extractEpisodeInfo(text) {
  // 以下のカテゴリ形式にマッチ
  // ・【web4コマ漫画更新！】
  // ・✨283フェスカウントダウン４コマ✨
  const category = text.match(/【(.+[4４]コマ漫画)\S*】|✨(.+コマ)✨/)?.[1]
  if (!category) return undefined

  // 以下のタイトル形式にマッチ
  // ・【「あいことば」付き4コマ漫画】  『イルミネーション』
  // ・第9話『両手に花』
  // ・第241話「プレゼント交換」
  const title = text.match(/[】話]\s*[『「](.+?)[』」]/)?.[1] || ''

  const matched = text.match(/第(\d+)話/)?.[1]
  const number = typeof matched === 'undefined' ? null : parseInt(matched)

  // 登場するアイドルを取得
  //（ユニット名が含まれている場合それに属しているアイドルも追加）
  const findIdols = idols
    .filter(
      ({ name, unit }) => text.includes(name.first) || text.includes(unit)
    )
    .map((e) => e.name.full)

  return {
    category,
    title,
    number,
    idols: findIdols,
    url: '',
    photoUrl: '',
    publishedUtc: ''
  }
}
