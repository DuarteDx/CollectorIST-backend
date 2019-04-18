import { mapper } from 'porg'
import Joi from 'joi'
import { schema as DateObjectSchema } from '@/schemas/DateObjectSchema'

const AffiliationSchema = (payload) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    unit: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required()
    }),
    start: DateObjectSchema.required(),
    end: DateObjectSchema
  }).required()
  return mapper(schema, payload)
}

export default AffiliationSchema
