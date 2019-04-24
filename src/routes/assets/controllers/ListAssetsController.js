import ListAssetsService from '@/services/assets/ListAssetsService'
// import Joi from 'joi'

const handler = async (request, h) => {
  const assets = await ListAssetsService()
  return assets

  /* const { totalItems, items } = await ListAssetsService({
    author: request.query.author,
    skip: request.query.skip,
    limit: request.query.limit,
    sort: request.query.sort,
    q: request.query.q,
    templates: request.query['template[]'],
    start: request.query.start,
    end: request.query.end
  })
  return {
    totalItems,
    items
  } */
}

const config = {
  description: 'List assets',
  /* validate: {
    query: {
      author: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10),
      sort: Joi.array().default([]), // "title:asc", "date:desc"
      q: Joi.string().allow(''),
      'template[]': Joi.array().single().default([]),
      start: Joi.date(),
      end: Joi.date().min(Joi.ref('start'))
    }
  }, */
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
