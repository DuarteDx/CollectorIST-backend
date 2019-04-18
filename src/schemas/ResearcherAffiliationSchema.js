import Joi from 'joi'
import { mapper } from 'porg'
import { schema as DateObjectSchema } from './DateObjectSchema'

const ResearcherAffiliation = (payload) => {
  const schema = Joi.object().keys({
    id: Joi.string(),
    unit: Joi.object().keys({
      acronym: Joi.string(),
      id: Joi.string(),
      name: Joi.string(),
      path: Joi.array().items({
        id: Joi.string().required(),
        acronym: Joi.string().required()
      })
    }),
    start: DateObjectSchema.required(),
    end: DateObjectSchema.default(null)
  }).required()
  return mapper(schema, payload)
}

export default ResearcherAffiliation
