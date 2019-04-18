import builder from 'xmlbuilder'
import GetOAIPMHURLService from './GetOAIPMHURLService'

export default function ({ requestAttributes, path }) {
  const rootNode = builder.begin({ skipNullAttributes: true }).dec('1.0', 'UTF-8')
    .ele('OAI-PMH', {
      'xmlns': 'http://www.openarchives.org/OAI/2.0/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.openarchives.org/OAI/2.0/ http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd'
    })
  rootNode.ele('responseDate', new Date().toISOString())
  rootNode.ele('request', requestAttributes, GetOAIPMHURLService({ path }))
  return rootNode
}
