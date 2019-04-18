import { v1 as uuid } from 'uuid'

export default class MetadataType {
  constructor ({ id, template }) {
    this.id = id
    this.template = template
  }

  getId () {
    return this.id
  }

  getType () {
    return this.template
  }

  toJson ({ origin }) {
    const record = this.export()
    if (record.externalIdentifiers) {
      if (record.externalIdentifiers.doi) {
        record.doi = record.externalIdentifiers.doi
      }
      if (record.externalIdentifiers.eid) {
        record.eid = record.externalIdentifiers.eid
      }
    }

    for (let key in record) {
      if (record[key] === null || record[key] === undefined) {
        delete record[key]
      }
    }

    return {
      'template_type': this.template,
      'metadata_format': 'bibtex',
      'type': 'record',
      'fields': record,
      'matches': [],
      'prid': [],
      'rid': uuid(),
      'active': true,
      'source': {
        'originalType': origin,
        'originalCreator': origin,
        'originalSource': this.id,
        'type': origin,
        'editor': origin,
        'updateTimestamp': Date.now()
      }
    }
  }

  export () {
    throw new Error(`MetadataType [${this.type}] needs to redefine the export method`)
  }
}
