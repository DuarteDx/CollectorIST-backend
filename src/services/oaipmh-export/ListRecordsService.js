import GetOAIPMHRootNodeService from './GetOAIPMHRootNodeService'

const VERB = 'ListRecords'

export default ({ path, resumptionToken }) => {
  const rootNode = GetOAIPMHRootNodeService({ requestAttributes: { verb: VERB }, path })

  return rootNode.end()
}
