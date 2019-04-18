import GenericEntry from './GenericEntry'

export default (identifier, payload) => {
  return {
    ...GenericEntry(identifier, payload),
    type: 'master-thesis',
    advisors: payload.metadata.resource['dc:contributor']
  }
}
