import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const ResearcherSupervision = (payload) => {
  const schema = MongoDBObject.keys({
    title: Joi.string()
    // TODO, add remaining fields once decided
  }).required()
  return mapper(schema, payload)
}

export default ResearcherSupervision
