import { mapper } from 'porg'
import Joi from 'joi'

const ListedRecord = (payload) => {
  const schema = Joi.object().keys({
    type: Joi.string(),
    title: Joi.string(),
    author: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      userId: Joi.string().optional()
    })),
    year: Joi.number().integer(),
    month: Joi.number().integer(),
    template: Joi.string(),
    metadata: {
      id: Joi.string()
    }
  }).required()
  return mapper(schema, payload)
}

export default ListedRecord
