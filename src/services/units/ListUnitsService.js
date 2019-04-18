import { Elasticsearch, config } from 'porg'
import UnitSchema from '@/schemas/UnitSchema'

export default async ({ realm, parentID, skip, limit, sort, q, ignored }) => {
  const client = await Elasticsearch.getClient()

  const body = {
    from: skip,
    size: limit,
    query: {
      bool: {
        must: [],
        should: [],
        must_not: []
      }
    }
  }

  if (parentID) {
    body.query.bool.must.push({ term: { 'parentID': parentID } })
  }

  if (ignored.length > 0) {
    body.query.bool.must_not.push({ terms: { '_id': ignored } })
  }

  if (q) {
    body.query.bool.should.push({ match: { 'name': q } })
  }

  const response = await client.search({
    index: config.indexName,
    type: 'units',
    body
  })

  const units = response.hits.hits.map(r => {
    return {
      ...r._source,
      _id: r._id
    }
  })
  return {
    totalItems: response.hits.total,
    items: units.map(UnitSchema)
  }
}
