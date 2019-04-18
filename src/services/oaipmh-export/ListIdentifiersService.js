import GetOAIPMHRootNodeService from './GetOAIPMHRootNodeService'

const VERB = 'ListIdentifiers'

export default ({ path, from, until, metadataPrefix, set, resumptionToken }) => {
  const rootNode = GetOAIPMHRootNodeService({ requestAttributes: { verb: VERB, metadataPrefix }, path })

  const listIdentifiersNode = rootNode.ele(VERB)

  if (!metadataPrefix) {
    rootNode.ele('error', { code: 'badArgument' }, 'ListIdentifiers verb must receive the metadataPrefix parameter')
    return rootNode.end()
  }

  if (metadataPrefix !== 'oai_dc') {
    rootNode.ele('error', { code: 'cannotDisseminateFormat' }, 'Unknown metadata format')
    return rootNode.end()
  }

  const entries = [{
    identifier: 'oai:repositorio.ul.pt:10451/158',
    datestamp: '2010-06-16T01:00:28Z',
    sets: ['com_10451_28']
  }]

  if (entries && entries.length > 0) {
    for (let entry of entries) {
      const headerNode = listIdentifiersNode.ele('header')
      headerNode.ele('identifier', entry.identifier)
      headerNode.ele('datestamp', entry.datestamp)
      for (let set of entry.sets) {
        headerNode.ele('setSpec', set)
      }
    }
  } else {
    rootNode.ele('error', { code: 'noRecordsMatch' }, 'No Records could be found')
    return rootNode.end()
  }

  return rootNode.end()
}
