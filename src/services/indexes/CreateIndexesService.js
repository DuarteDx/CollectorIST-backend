import { Elasticsearch, Mongo, config, lockProvider } from 'porg'
import IndexAssetService from '@/services/assets/IndexAssetService'

const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default async () => {
  const client = await Elasticsearch.getClient()
  if (await client.indices.exists({ index: config.indexName })) {
    return
  }

  const sessionIndex = await lockProvider.createSession()
  const sessionRenewInterval = setInterval(async () => {
    await sessionIndex.renewSession()
  }, 5000)
  while (!(await sessionIndex.attemptLock({ lockId: 'indexData' }))) {
    await sleep(1000)
  }
  try {
    const db = await Mongo.getDB()
    const assets = await db.collection('assets').find({ active: true }).toArray()

    await client.indices.create({
      index: config.indexName,
      body: {
        settings: {
          index: {
            analysis: {
              'number_of_shards': 1,
              'number_of_replicas': 5,
              analyzer: {
                'StandartAndLowerCase': {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase']
                }
              }
            }
          }
        }
      }
    })

    await client.indices.putMapping({
      index: config.indexName,
      type: 'assets',
      body: {
        _all: { enabled: false },
        properties: {
          title: { type: 'text', analyzer: 'StandartAndLowerCase' },
          author: { type: 'keyword' }
        }
      }
    })
    const counter = {
      assets: {
        processed: 0,
        ignored: 0
      }
    }
    for (let asset of assets) {
      counter.assets.processed++
      await IndexAssetService({ asset })
    }
    return counter
  } catch (err) {
    throw err
  } finally {
    await sessionIndex.releaseLock({ lockId: 'indexData' })
    await sessionIndex.destroySession()
    clearInterval(sessionRenewInterval)
  }
}
