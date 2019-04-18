import { Elasticsearch, config } from 'porg'

export default async ({ unit }) => {
  const client = await Elasticsearch.getClient()
  const id = unit.id
  delete unit.id
  const response = await client.create({
    index: config.indexName,
    type: 'units',
    id,
    body: unit
  })
  return response
}
