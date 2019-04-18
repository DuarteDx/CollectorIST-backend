import { logger } from 'porg'
import bibtexParse from 'bibtex-parse-js'

export default class Adapter {
  static externalIdentifiers (entry) {
    const result = {}
    if (entry['external-ids'] && entry['external-ids']['external-id']) {
      entry['external-ids']['external-id'].forEach((externalIdentifier) => {
        result[externalIdentifier['external-id-type']] = externalIdentifier['external-id-value']
      })
    }
    return result
  }

  static author (entry) {
    if (entry['contributors'] !== null && entry['contributors']['contributor'].length !== 0) {
      return entry['contributors']['contributor'].map((externalIdentifier) => {
        if (!externalIdentifier['credit-name']) {
          return null
        }
        const result = {
          name: externalIdentifier['credit-name'].value
        }
        if (externalIdentifier['contributor-orcid'] !== null) {
          result.orcid = externalIdentifier['contributor-orcid']
        }
        return result
      })
    } else {
      if (entry['citation'] && entry['citation']['citation-type'] === 'BIBTEX') {
        var bibtexJson = bibtexParse.toJSON(entry['citation']['citation-value'])[0]
        if (bibtexJson && bibtexJson.entryTags && bibtexJson.entryTags.author) {
          const author = bibtexJson.entryTags.author
          const authors = author.split(' and ')
          return authors.map(a => { return { name: a } })
        }
      } else {
        return null
      }
    }
  }

  static bibtex (entry) {
    if (entry['citation'] && entry['citation']['citation-type'] === 'BIBTEX') {
      return entry['citation']['citation-value']
    } else {
      return null
    }
  }

  static putCode (entry) {
    return entry['put-code']
  }

  static title (entry) {
    if (entry['title'] && entry['title']['title']) {
      return entry['title']['title'].value
    } else {
      return null
    }
  }

  static journal (entry) {
    if (entry['journal-title']) {
      return entry['journal-title'].value
    } else {
      return null
    }
  }

  static year (entry) {
    if (entry['publication-date'] && entry['publication-date']['year']) {
      return entry['publication-date']['year'].value
    } else {
      return null
    }
  }

  static month (entry) {
    if (entry['publication-date'] && entry['publication-date']['month']) {
      return entry['publication-date']['month'].value
    } else {
      return null
    }
  }

  static lastModified (entry) {
    if (entry['last-modified-date']) {
      return entry['last-modified-date'].value
    } else {
      return null
    }
  }

  static parseFields (fields, entry) {
    const result = {}
    fields.forEach((field) => {
      if (this[field]) {
        result[field] = this[field](entry)
      } else {
        logger(['err', 'orcid-importer', 'adapter', 'missing-field-parser'], `Missing parser for field ${field}`)
      }
    })
    return result
  }
}
