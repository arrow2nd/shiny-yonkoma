import dotenv from 'dotenv'
import { writeFileSync, readFileSync } from 'fs'
import { TwitterApi, TwitterV2IncludesHelper } from 'twitter-api-v2'

import { extractEpisodeInfo } from './libs/extract.js'

dotenv.config()

/** @type {any[]} */
const yonkoma = JSON.parse(readFileSync('./docs/yonkoma.json').toString())

const client = new TwitterApi(process.env.BEARER_TOKEN || '')

;(async () => {
  const prevYonkomaLength = yonkoma.length

  const keyword = 'from:imassc_official コマ -is:retweet -is:reply'
  const results = await client.v2.search(keyword, {
    expansions: 'referenced_tweets.id,attachments.media_keys',
    'tweet.fields': 'created_at',
    'media.fields': 'url'
  })
  const includes = new TwitterV2IncludesHelper(results)

  for await (const tweet of results) {
    const photoUrl = includes.medias(tweet)?.[0].url
    if (!photoUrl) continue

    const newEpisode = extractEpisodeInfo(tweet.text)
    if (!newEpisode) continue

    const newUrl = `https://twitter.com/imassc_official/status/${tweet.id}`
    if (yonkoma.find((e) => e.url === newUrl)) continue

    yonkoma.push({
      ...newEpisode,
      photoUrl,
      url: newUrl,
      publishedUtc: tweet.created_at || ''
    })

    console.log(
      `[ADD] 【${newEpisode.category}】第${newEpisode.number}話『${newEpisode.title}』`
    )
  }

  // データ数が同じなら保存しない
  if (prevYonkomaLength === yonkoma.length) return

  const data = yonkoma.sort((a, b) =>
    new Date(a.publishedUtc) > new Date(b.publishedUtc) ? 1 : -1
  )

  writeFileSync('./docs/yonkoma.json', JSON.stringify(data, null, '\t'))

  console.log('[SUCCESS]')
})()
