import { Elasticsearch, config } from 'porg'

export default async ({ realm, users, skip, limit, sort, q }) => {
  if (users.length) {
    skip = 0
    limit = users.length
  }
  const client = await Elasticsearch.getClient()

  const sortArray = []
  for (const s of sort) {
    const [sortBy, asc] = s.split(':')
    let orderBy
    let ascending
    switch (sortBy) {
      case 'name': orderBy = 'name'; break
      default: orderBy = 'name'
    }
    switch (asc) {
      case 'asc': ascending = 'asc'; break
      case 'desc': ascending = 'desc'; break
      default: ascending = 'asc'
    }
    const order = {}
    order[orderBy] = ascending
    sortArray.push(order)
  }
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
  if (sortArray.length > 0) {
    sortArray.push('_score')
    body.sort = sortArray
  }
  body.query.bool.must.push({ term: { 'roles': 'researcher' } })
  if (users.length) {
    body.query.bool.must.push({ terms: { username: users } })
  }
  if (q) {
    body.query.bool.must.push({ match: { name: q } })
    // body.query.bool.should.push({ term: { 'username': q } })
  }

  const response = await client.search({
    index: config.indexName,
    type: 'users',
    body
  })

  const researchers = response.hits.hits.map(r => {
    return {
      ...r._source,
      id: r._id
    }
  })
  return {
    totalItems: response.hits.total,
    items: researchers
  }
}
