import { mapper } from 'porg'
import Joi from 'joi'

const AliasesSchema = (payload) => {
  const schema = Joi.array().items(Joi.object().keys({
    value: Joi.string().required(),
    origin: Joi.string().valid(['orcid', 'scopus', 'manual']).required()
  })).default([])
  return mapper(schema, payload)
}

export default AliasesSchema
