import { mapper } from 'porg'
import Joi from 'joi'

const EmailsSchema = (payload) => {
  const schema = Joi.object().keys({
    emails: Joi.array().items(Joi.object().keys({
      id: Joi.string().required(),
      email: Joi.string().required(),
      verified: Joi.boolean()
    })).default([]),
    primaryEmailId: Joi.string()
  }).rename('primaryEmail', 'primaryEmailId')
  return mapper(schema, payload)
}

export default EmailsSchema
