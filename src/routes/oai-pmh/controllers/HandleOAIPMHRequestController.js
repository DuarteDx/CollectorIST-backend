import Joi from 'joi'
import IdentifyService from '@/services/oaipmh-export/IdentifyService'
import GetRecordService from '@/services/oaipmh-export/GetRecordService'
import ListRecordsService from '@/services/oaipmh-export/ListRecordsService'
import ListIdentifiersService from '@/services/oaipmh-export/ListIdentifiersService'
import ListSetsService from '@/services/oaipmh-export/ListSetsService'
import ListMetadataFormatsService from '@/services/oaipmh-export/ListMetadataFormatsService'

const handler = async (request, h) => {
  console.log(request.info.hostname)
  switch (request.query.verb) {
    case 'Identify': return h.response(IdentifyService({ path: request.path })).type('application/xml')
    case 'GetRecord': return h.response(GetRecordService({ path: request.path, ...request.query })).type('application/xml')
    case 'ListIdentifiers': return h.response(ListIdentifiersService({ path: request.path, ...request.query })).type('application/xml')
    case 'ListSets': return h.response(ListSetsService({ path: request.path, ...request.query })).type('application/xml')
    case 'ListRecords': return h.response(ListRecordsService({ path: request.path, ...request.query })).type('application/xml')
    case 'ListMetadataFormats': return h.response(ListMetadataFormatsService({ path: request.path, ...request.query })).type('application/xml')
  }
}

const resumptionTokenSchema = Joi.string().optional()
const dateSchema = Joi.date().iso()

const config = {
  description: 'The OAI-PMH request handler',
  validate: {
    query: Joi.alternatives().try({
      verb: 'Identify'
    }, {
      verb: 'ListSets',
      resumptionToken: resumptionTokenSchema
    }, {
      verb: 'ListMetadataFormats',
      identifier: Joi.string().optional()
    }, {
      verb: 'GetRecord',
      identifier: Joi.string().required(),
      metadataPrefix: Joi.string().valid(['oai_dc']).required()
    }, {
      verb: Joi.string().valid(['ListRecords', 'ListIdentifiers']).required(),
      resumptionToken: resumptionTokenSchema,
      from: dateSchema.optional(),
      until: dateSchema.optional(),
      set: Joi.string().optional(),
      metadataPrefix: Joi.string().required()
    })
  },
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default {
  handler,
  config
}
