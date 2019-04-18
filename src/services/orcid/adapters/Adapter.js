import Parser from './Parser'
import Types from '../metadata-types'
import bibtexParse from 'bibtex-parse-js'
import stringSimilarity from 'string-similarity'
import { NoAuthorException, NoBibtexException, NoDateException } from '../OrcidExceptions'
import { logger } from 'porg'

export default class Adapter {
  static getType () {
    throw new Error('This method should be overrided')
  }

  static getFields () {
    throw new Error('This method should be overrided')
  }

  static allFields () {
    return ['putCode', 'title', 'author', 'bibtex', 'externalIdentifiers'].concat(this.getFields())
  }

  static convert ({ username, name, aliases, entry }) {
    aliases = aliases || []
    const parsedEntry = Parser.parseFields(this.allFields(), entry)
    if (!parsedEntry.author) {
      throw new NoAuthorException(`User ${username} not found`)
    }
    const authors = parsedEntry.author.filter((author) => author).map((author) => { return author.name })
    if (authors.length === 0 || !(authors instanceof Array)) {
      throw new NoAuthorException(`User ${username} not found`)
    }
    const votes = {}
    const similarity = stringSimilarity.findBestMatch(name, authors)
    let bestNameMatch = similarity.bestMatch.target
    if (votes[bestNameMatch]) {
      votes[bestNameMatch] += 1
    } else {
      votes[bestNameMatch] = 1
    }
    aliases.forEach((alias) => {
      const similarity = stringSimilarity.findBestMatch(alias, authors)
      const bestNameMatch = similarity.bestMatch.target
      if (votes[bestNameMatch]) {
        votes[bestNameMatch] += 1
      } else {
        votes[bestNameMatch] = 1
      }
    })
    bestNameMatch = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)

    parsedEntry.author.forEach((author) => {
      if (author.name === bestNameMatch) {
        author.userId = username
      }
    })
    if (!parsedEntry.bibtex) {
      throw new NoBibtexException(`No bibtex found from ${parsedEntry.title}`)
    }
    var bibtexJson = bibtexParse.toJSON(parsedEntry.bibtex)[0]
    delete bibtexJson.author
    delete bibtexJson.metadata_format
    if (!Types[bibtexJson.entryType]) {
      logger(['err', 'orcid-importer', 'missing-type-conversion'], `No type was found for ${bibtexJson.entryType}`)
    }
    if (!bibtexJson.entryTags['year'] && !parsedEntry['year']) {
      logger(['err', 'orcid-importer', 'missing-date'], `No date was found in metadata ${JSON.stringify(entry)}`)
      throw new NoDateException(`No date in metadata ${entry}`)
    }
    return new Types[bibtexJson.entryType]({
      id: parsedEntry.putCode,
      type: bibtexJson.entryType,
      ...bibtexJson.entryTags,
      ...parsedEntry
    })
  }
}
