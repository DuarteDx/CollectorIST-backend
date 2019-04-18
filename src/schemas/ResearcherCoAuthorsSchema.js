import { mapper } from 'porg'
import Joi from 'joi'

const ResearcherCoAuthor = (payload) => {
  const schema = Joi.object().keys({
    id: Joi.string(),
    username: Joi.string(),
    name: Joi.string(),
    avatar: Joi.string(),
    commonRecords: Joi.number().integer().min(1)
  }).required()
  return mapper(schema, payload)
}

export default ResearcherCoAuthor
