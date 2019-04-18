import GetOAIPMHRootNodeService from './GetOAIPMHRootNodeService'
import GetOAIPMHURLService from './GetOAIPMHURLService'
import { config } from 'porg'

const VERB = 'Identify'

export default ({ path }) => {
  const rootNode = GetOAIPMHRootNodeService({ requestAttributes: { verb: VERB }, path })
  const identifyNode = rootNode.ele(VERB)
  identifyNode.ele('repositoryName', config.oaiPmh.name)
  identifyNode.ele('protocolVersion', '2.0')
  config.oaiPmh.adminEmails.forEach((adminEmail) => {
    identifyNode.ele('adminEmail', adminEmail)
  })
  identifyNode.ele('baseURL', GetOAIPMHURLService({ path }))

  identifyNode.ele('earliestDatestamp', 'timestamp')
  identifyNode.ele('deletedRecord', config.oaiPmh.deletedRecord)

  identifyNode.ele('granularity', 'YYYY-MM-DDThh:mm:ssZ')

  return rootNode.end()
}
