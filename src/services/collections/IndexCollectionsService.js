import { Elasticsearch, config } from 'porg'

export default async ({ collections }) => {
  const client = await Elasticsearch.getClient()
  const id = collections.id
  delete collections.id
  const response = await client.create({
    index: config.indexName,
    type: 'collections',
    id,
    body: collections
  })
  return response
}
