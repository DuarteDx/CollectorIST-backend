import GetOAIPMHRootNodeService from './GetOAIPMHRootNodeService'
import GetOAIPMHURLService from './GetOAIPMHURLService'

const VERB = 'ListSets'

export default ({ path, resumptionToken }) => {
  const rootNode = GetOAIPMHRootNodeService()
  rootNode.ele('request', {
    verb: VERB
  }, GetOAIPMHURLService({ path }))

  const sets = [{
    spec: 'driver',
    name: 'Driver'
  }]

  var listSetsNode = rootNode.ele('ListSets')
  sets.forEach((set) => {
    const setNode = listSetsNode.ele('set')
    setNode.ele('setSpec', set.spec)
    setNode.ele('setName', set.name)
  })
  if (resumptionToken) {
    listSetsNode.ele('resumptionToken', resumptionToken.metadata, resumptionToken.token)
  }

  return rootNode.end()
}
