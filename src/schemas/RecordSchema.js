import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const Record = (payload) => {
  const schema = MongoDBObject.keys({
    type: Joi.string(),
    title: Joi.string(),
    authors: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      id: Joi.string().optional()
    }))
  }).required()
  return mapper(schema, payload)
}

export default Record
