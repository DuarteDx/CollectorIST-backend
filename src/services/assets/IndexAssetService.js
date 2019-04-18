import { Elasticsearch, config } from 'porg'

export default async ({ asset }) => {
  const client = await Elasticsearch.getClient()
  const id = asset.id
  delete asset.id
  const response = await client.create({
    index: config.indexName,
    type: 'assets',
    id,
    body: asset
  })
  return response
}
