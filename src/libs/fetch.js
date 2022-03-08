import axios from 'axios'

/**
 * imasparql にクエリを投げる
 * @param query 検索クエリ
 * @returns 検索結果
 */
export async function fetchIdolData(query) {
  const trimedQuery = query.replace(/[\n\r|\s+]/g, ' ')

  const url = new URL('https://sparql.crssnky.xyz/spql/imas')
  url.searchParams.append('output', 'json')
  url.searchParams.append('query', trimedQuery)

  try {
    const res = await axios.get(url.toString(), {
      timeout: 5000
    })
    return res.data.results.bindings
  } catch (err) {
    console.error(err)
    throw err
  }
}
