import { Elasticsearch, config } from 'porg'

export default async ({ author, skip, limit, sort, q, templates, start, end }) => {
  const client = await Elasticsearch.getClient()

  const sortArray = []
  for (const s of sort || []) {
    const [sortBy, asc] = s.split(':')
    let orderBy
    let ascending
    switch (sortBy) {
      case 'date': orderBy = 'date'; break
      case 'template': orderBy = 'template'; break
      default: orderBy = 'date'
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
        should: [],
        filter: []
      }
    }
  }
  if (sortArray.length > 0) {
    sortArray.push('_score')
    body.sort = sortArray
  }
  if (q) {
    body.query.bool.must.push({ match: { title: q } })
  }
  if (start) {
    body.query.bool.filter.push({ range: { date: { gte: start } } })
  }
  if (end) {
    body.query.bool.filter.push({ range: { date: { lte: end } } })
  }
  if (author) {
    body.query.bool.filter.push({ term: { 'author': author } })
  }
  if (templates.length) {
    body.query.bool.must.push({ terms: { 'template': templates } })
  }

  const response = await client.search({
    index: config.indexName,
    type: 'assets',
    body
  })

  const assets = response.hits.hits.map(r => {
    return {
      ...r._source,
      metadata: {
        id: r._id
      }
    }
  })
  return {
    totalItems: response.hits.total,
    items: assets
  }
}