// import ListRecordsService from '@/services/records/ListRecordsService'
import Joi from 'joi'

const handler = async (request, h) => {
  // TODO
  return {}
}

const config = {
  description: 'List records',
  validate: {
    query: {
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).required(),
      sort: Joi.string(),
      q: Joi.string().allow(''),
      type: Joi.array(),
      year: Joi.number().integer().min(0)
    }
  },
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
