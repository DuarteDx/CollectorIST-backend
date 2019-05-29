import { Mongo, errorWithKey } from 'porg'

const paginate = async ({ collection, pipeline, skip, limit }) => {
  let db = await Mongo.getDB()

  const fullPipeline = pipeline || []
  fullPipeline.push({
    $facet: {
      data: [{ $skip: skip }, { $limit: limit }],
      metadata: [{ $count: 'count' }]
    }
  })
  let aggregateResults = await db.collection(collection).aggregate(fullPipeline).toArray()

  if (!aggregateResults.length) {
    // FIXME, sort out what error message to use
    throw errorWithKey('internal-error')
  }

  const aggregateResult = aggregateResults[0]
  if (aggregateResult.data.length > 0 && aggregateResult.metadata.length > 0) {
    return {
      totalItems: aggregateResult.metadata[0].count,
      items: aggregateResult.data
    }
  } else {
    return {
      totalItems: 0,
      items: []
    }
  }
}

export default {
  paginate
}
