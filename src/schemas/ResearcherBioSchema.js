import { mapper } from 'porg'
import Joi from 'joi'

const ResearcherBio = (payload) => {
  const schema = Joi.object().keys({
    short: Joi.string(),
    extended: Joi.string()
  }).required()
  return mapper(schema, payload)
}

export default ResearcherBio
