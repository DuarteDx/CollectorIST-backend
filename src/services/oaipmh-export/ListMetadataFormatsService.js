import GetOAIPMHRootNodeService from './GetOAIPMHRootNodeService'

const VERB = 'ListMetadataFormats'

export default ({ path, identifier }) => {
  const rootNode = GetOAIPMHRootNodeService({ requestAttributes: { verb: VERB, identifier }, path })

  const metadataFormats = [{
    prefix: 'oai_dc',
    schema: 'http://www.openarchives.org/OAI/2.0/oai_dc.xsd',
    namespace: 'http://www.openarchives.org/OAI/2.0/oai_dc/'

  }]

  if (identifier) {
    // GO CHECK THAT idExists
    const idExists = true
    if (!idExists) {
      rootNode.ele('error', { code: 'idDoesNotExist' }, 'The given id does not exist')
      return rootNode.end()
    } else {
      // set Metadata formats
    }
  }
  const listMetadataFormatsNode = rootNode.ele(VERB)
  for (let metadataFormat of metadataFormats) {
    const metadataFormatNode = listMetadataFormatsNode.ele('metadataFormat')
    metadataFormatNode.ele('metadataPrefix', metadataFormat.prefix)
    metadataFormatNode.ele('schema', metadataFormat.schema)
    metadataFormatNode.ele('metadataNamespace', metadataFormat.namespace)
  }
  return rootNode.end()
}
