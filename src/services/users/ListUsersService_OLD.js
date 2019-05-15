import { Elasticsearch, config } from 'porg'
import UserSchema from '@/schemas/UserSchema'

export default async ({ skip, limit, sort, q, roles }) => {
  const client = await Elasticsearch.getClient()

  const body = {
    from: skip,
    size: limit,
    query: {
      bool: {
        must: [],
        should: []
      }
    }
  }

  if (q) {
    body.query.bool.should.push({ match: { 'name': q } })
  }

  if (roles) {
    roles.forEach((r) => {
      body.query.bool.must.push({ match: { 'roles': r } })
    })
  }

  const response = await client.search({
    index: config.indexName,
    type: 'users',
    body
  })

  const users = response.hits.hits.map(r => {
    return {
      ...r._source,
      _id: r._id
    }
  })
  return {
    totalItems: response.hits.total,
    items: users.map(UserSchema)
  }
}
