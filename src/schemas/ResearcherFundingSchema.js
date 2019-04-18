import { mapper } from 'porg'
import MongoDBObjectSchema from '@/schemas/MongoDBObject'
import { schema as DateObjectSchema } from '@/schemas/DateObjectSchema'
import Joi from 'joi'

const ResearcherFunding = (payload) => {
  const schema = MongoDBObjectSchema.keys({
    projectId: Joi.string(),
    projectUrl: Joi.string(),
    type: Joi.string(),
    title: Joi.string(),
    organization: Joi.object(),
    amount: Joi.object().keys({
      value: Joi.string().required(),
      currency: Joi.string().required()
    }),
    description: Joi.string().allow(''),
    start: DateObjectSchema,
    end: DateObjectSchema
  }).required()
  return mapper(schema, payload)
}

export default ResearcherFunding
