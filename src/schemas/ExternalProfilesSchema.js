import { mapper } from 'porg'
import Joi from 'joi'

const ExternalProfiles = (payload) => {
  const schema = Joi.object().keys({
    orcid: Joi.object().keys({
      id: Joi.string().optional(),
      oAuthLink: Joi.string().optional(),
      lastSync: Joi.date().iso().allow(null).optional()
    }),
    scopus: Joi.object().keys({
      id: Joi.string().optional(),
      lastSync: Joi.date().iso().allow(null).optional()
    }),
    dblp: Joi.object().keys({
      id: Joi.string().optional(),
      lastSync: Joi.date().iso().allow(null).optional()
    })
  }).required()
  return mapper(schema, payload)
}

export default ExternalProfiles
