import { writeFileSync } from 'fs'

import { fetchIdolData } from './libs/fetch.js'

/** SPARQLクエリ（シャイニーカラーズのアイドル名を取得） */
const query = `PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
SELECT distinct ?full ?first ?last ?kana ?unit
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?full;
     schema:familyName ?last;
     schema:givenName ?first;
     imas:nameKana ?kana;
     schema:memberOf ?memberOf.
  filter(contains(?brand, 'ShinyColors')).
  filter(lang(?first)="ja" && lang(?last)="ja").
  ?memberOf schema:name ?unit;
            schema:description ?unitDesc.
}
order by ?kana`

/** カナ置換用変換テーブル */
const convert2Kana = new Map([
  ['illuminationSTARS', 'イルミネーションスターズ'],
  ["L'Antica", 'アンティーカ'],
  ['ALSTROEMERIA', 'アルストロメリア'],
  ['Straylight', 'ストレイライト'],
  ['noctchill', 'ノクチル'],
  ['SHHis', 'シーズ']
])

;(async () => {
  const data = await fetchIdolData(query)

  const idols = data.map(({ full, first, last, unit }) => ({
    name: {
      full: full.value,
      first: first.value,
      last: last.value
    },
    unit: convert2Kana.get(unit.value) ?? unit.value
  }))

  // 書き出し
  const stringify = JSON.stringify(idols, null, '\t')
  const exportText = `export const idols = ${stringify}`
  writeFileSync('./src/data/idols.js', exportText)

  console.log('[ SUCCESS ]')
})()
