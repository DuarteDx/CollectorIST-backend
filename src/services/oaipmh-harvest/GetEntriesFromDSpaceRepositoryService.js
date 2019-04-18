import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import request from 'request'
import cheerio from 'cheerio'
import { OaiPmh } from 'oai-pmh'
import { logger } from 'porg'
import Adapters from './adapters'

var algorithm = 'sha256'
const METADATA_PREFIX = 'openaire4'

const metadataSets = {}

export default async function ({ baseURL, ignoreAttachments, from, until, filesystemPath, handleEntry }) {
  const baseRepositoryURL = new URL(baseURL)

  async function getSetIdentifiers ({ setSpec, setName }) {
    logger(['info', 'oai-pmh-harvester', 'list-identifiers'], `Listing identifiers for ${setSpec} with name ${setName}`)
    try {
      const identifierIterator = oaiPmh.listIdentifiers({
        set: setSpec,
        metadataPrefix: METADATA_PREFIX,
        from,
        until
      })
      for await (const entry of identifierIterator) {
        if (entry.$ && entry.$.status === 'deleted') {
          logger(['info', 'oai-pmh-harvester', 'list-identifiers'], `Deleted entry ${entry.identifier}`)
        } else {
          const record = await getRecord({ identifier: entry.identifier })
          await handleEntry(record)
        }
      }
    } catch (err) {
      logger(['err', 'oai-pmh-harvester'], JSON.stringify(err))
    }
  }

  async function getRecord ({ identifier }) {
    logger(['info', 'oai-pmh-harvester', 'get-record'], `Getting entry with identifier ${identifier}`)
    try {
      const entry = await oaiPmh.getRecord(identifier, METADATA_PREFIX)
      const parserName = entry.metadata.resource['dc:type']
      let adapter = Adapters[parserName]
      if (!adapter) {
        adapter = Adapters['conferenceObject']
      }
      return adapter(identifier, entry, metadataSets)
    } catch (err) {
      logger(['err', 'migration', 'get-entries-from-dspace-repository-service'], err)
      return {
        'forbidden': identifier
      }
    }

    //   { resource:
    //      { '$': [Object],
    //        'datacite:creator': [Object],
    //        'datacite:contributor': [Object],
    //        'datacite:relatedIdentifier': [Array],
    //        'datacite:date': [Array],
    //        'dc:title': [Object],
    //        'dc:language': [Object],
    //        'dc:publisher': [Object],
    //        'dc:date': '2015-10',
    //        'dc:type': [Object],
    //        'dc:description': [Object],
    //        'dc:identifier': [Array],
    //        'dc:rights': [Object],
    //        'dc:subject': [Array],
    //        file: [Object] } } }
    // }

    // if (!entry.metadata['oai_dc:dc']['dc:identifier']) {
    //   throw new Error('invalid identifier')
    // } else {
    //   const metadata = entry.metadata['oai_dc:dc']
    //   const record = {
    //     id: identifier,
    //     title: metadata['dc:title'],
    //     identifiers: metadata['dc:identifier'],
    //     author: metadata['dc:creator'],
    //     language: metadata['dc:language'] === 'por' ? 'pt' : 'en',
    //     rights: metadata['dc:rights'],
    //     description: metadata['dc:description']
    //   }
    //   const doiEntries = metadata['dc:identifier'].filter((id) => {
    //     return id.indexOf('doi') > -1
    //   })
    //   if (doiEntries.length > 0) {
    //     record['doi'] = doiEntries[0]
    //   }
    //   const handleEntries = metadata['dc:identifier'].filter((id) => {
    //     return id.startsWith('http://hdl.handle.net') > -1
    //   })
    //   if (handleEntries.length > 0) {
    //     record['handle'] = handleEntries[0]
    //   }
    //   if (metadata['dc:type'] === 'masterThesis') {
    //     record['type'] = 'mastersthesis'
    //     record['advisor'] = metadata['dc:contributor']
    //   } else if (metadata['dc:type'] === 'phdThesis') {
    //     record['type'] = 'phdthesis'
    //     record['advisor'] = metadata['dc:contributor']
    //   } else {
    //     record['type'] = 'article'
    //   }
    //   const handleIdentifiers = entry.metadata['oai_dc:dc']['dc:identifier'].filter((id) => {
    //     return id.startsWith('http://hdl.handle.net')
    //   })
    //   if (handleIdentifiers.length > 0) {
    //     record['attachments'] = await downloadAttachmentsFor({ handle: handleIdentifiers[0] })
    //   }
    // }
    // return JSON.stringify(entry, null, 2)
  }

  /* eslint-disable no-unused-vars */
  function downloadAttachmentsFor ({ handle }) {
    logger(['info', 'oai-pmh-harvester', 'download-attachment'], `Downloading files attached to ${handle}`)
    return new Promise((resolve, reject) => {
      request(handle, async function (error, response, html) {
        const files = {}
        const fileEntries = []
        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(html)
          $('tr td.standard a[target="_blank"]').each(function (i, element) {
            // var a = $(this).text()
            var link = baseRepositoryURL.origin + $(this).attr('href')
            files[link] = 1
          })
          for (const [i, file] of Object.keys(files).entries()) {
            try {
              const downloadedFile = await downloadFile(i, file, handle)
              fileEntries.push(downloadedFile)
            } catch (err) {
              logger(['warn', 'oai-pmh-harvester', 'download-file'], err.message)
            }
          }
          return resolve(fileEntries)
        } else {
          return reject(new Error('error while download attachments'))
        }
      })
    })
  }

  async function downloadFile (i, file, handle) {
    logger(['info', 'oai-pmh-harvester', 'download-file'], `Downloading file from ${file}`)
    return new Promise((resolve, reject) => {
      const url = new URL(handle)
      const filename = url.pathname.split('/').filter(e => e !== '').join('-') + '-' + i
      var r = request(file)
      r.on('response', function (res) {
        if (res.statusCode === 403) {
          logger(['info', 'oai-pmh-harvester'], `File ${file} is locked`)
          return reject(new Error(`File ${file} is locked`))
        } else {
          const destFile = path.join(filesystemPath, `${filename}.${res.headers['content-type'].split('/')[1]}`)
          logger(['info', 'oai-pmh-harvester', 'download-file'], `Storing file in ${destFile}`)
          var stream = res.pipe(fs.createWriteStream(destFile))
          stream.on('finish', async () => {
            const ck = await checksum(destFile)
            resolve({
              url: file,
              path: destFile,
              checksum: ck
            })
          })
          stream.on('error', reject)
        }
      })
      r.on('error', reject)
    })
  }

  function checksum (filepath) {
    var shasum = crypto.createHash(algorithm)

    var s = fs.ReadStream(filepath)
    s.on('data', function (data) {
      shasum.update(data)
    })
    return new Promise((resolve, reject) => {
      s.on('end', function () {
        var hash = shasum.digest('hex')
        return resolve(hash)
      })
    })
  }

  const oaiPmh = new OaiPmh(baseURL)

  const setIterator = oaiPmh.listSets({
    metadataPrefix: METADATA_PREFIX
  })
  for await (const setEntry of setIterator) {
    metadataSets[setEntry.setSpec] = setEntry.setName
  }
  for (const setSpec in metadataSets) {
    await getSetIdentifiers({ setSpec, setName: metadataSets[setSpec] })
  }
}
