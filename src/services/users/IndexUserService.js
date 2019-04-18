import { Elasticsearch, config } from 'porg'

export default async ({ user }) => {
  const client = await Elasticsearch.getClient()
  const id = user.id
  delete user.id
  const response = await client.create({
    index: config.indexName,
    type: 'users',
    id,
    body: user
  })
  return response
}
