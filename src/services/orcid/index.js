import axios from 'axios'
import adapters from './adapters'
import { logger } from 'porg'
import { NoAuthorException, NoBibtexException, NoAdapterTypeException, NoDateException } from './OrcidExceptions'

const MAX_PUT_CODES_TO_REQUEST_IN_BULK = 20

const client = axios.create({
  baseURL: 'https://pub.orcid.org/v2.0/',
  timeout: 60000,
  headers: { 'Accept': 'application/orcid+json' }
})

const getWorkIdUpdates = async (orcidId, timestamp) => {
  timestamp = timestamp === undefined ? Date.now() : timestamp
  const ORCIDLink = `/${orcidId}/works`
  try {
    const result = {}
    const page = await client.get(ORCIDLink)
    page.data.group.forEach((work) => {
      const externalIds = {}
      work['external-ids']['external-id'].forEach((externalId) => {
        externalIds[externalId['external-id-type']] = externalId['external-id-value']
      })
      const metadata = work['work-summary'][0]
      const putCode = metadata['put-code']
      const lastUpdate = metadata['last-modified-date']['value']

      if (lastUpdate > timestamp) {
        result[putCode] = metadata['last-modified-date']['value']
      }
    })
    return result
  } catch (error) {
    logger(['err', 'orcid-importer', 'get-work-id-updates'], error.message)
  }
}

const getWorkUrl = (orcidId, putCodes) => {
  if (typeof putCodes === 'number') {
    return `${orcidId}/work/${putCodes}`
  } else {
    return `${orcidId}/works/${putCodes.join(',')}`
  }
}

const getFundingsUrl = (orcidId) => {
  return `${orcidId}/fundings`
}

const getDetailedFundingUrl = (orcidId, putCode) => {
  return `${orcidId}/funding/${putCode}`
}

const handleWork = ({ username, name, aliases, work }) => {
  const adapter = adapters[work.type]
  if (!adapter) {
    logger(['err', 'orcid-importer', 'handle-work'], `No adapter found for type ${work.type} when importing works for user ${name} (${username})`)
    throw new NoAdapterTypeException(work.type, `No adapter found for type: ${work.type} content: ${JSON.stringify(work)}`)
  } else {
    try {
      return adapter.convert({ username, name, aliases, entry: work })
    } catch (err) {
      if (err instanceof NoAuthorException) {
        return {
          error: true,
          work,
          type: 'NoAuthorFound'
        }
      } else if (err instanceof NoBibtexException) {
        return {
          error: true,
          work,
          type: 'NoBibtexException'
        }
      } else if (err instanceof NoDateException) {
        return {
          error: true,
          work,
          type: 'NoDateException'
        }
      } else {
        logger(['err', 'orcid-importer', 'handle-work', 'unknown-error'], err.message)
        return {
          error: true,
          work,
          type: 'Undefined',
          message: err.message
        }
      }
    }
  }
}

const breakArrayIntoChunks = (a, size) => {
  var arrays = []
  while (a.length > 0) {
    arrays.push(a.splice(0, size))
  }
  return arrays
}

const getDetailedWorks = async ({ username, name, aliases, orcidID, timestamp }) => {
  const putCodes = Object.keys(await getWorkIdUpdates(orcidID, timestamp))
  try {
    const chunks = breakArrayIntoChunks(putCodes, MAX_PUT_CODES_TO_REQUEST_IN_BULK)
    let returnArray = []
    for (let putCodesChunck of chunks) {
      const page = await client.get(getWorkUrl(orcidID, putCodesChunck))
      returnArray = returnArray.concat(page.data.bulk.map((entry) => {
        return handleWork({ username, name, aliases, work: entry.work })
      }))
    }
    return returnArray
  } catch (error) {
    logger(['err', 'orcid-importer', 'get-detailed-works'], error.message)
    if (error instanceof NoAdapterTypeException) {
      throw error
    }
  }
}

const getFundingIdUpdates = async (orcidId, timestamp) => {
  timestamp = timestamp === undefined ? Date.now() : timestamp
  try {
    const result = {}
    const page = await client.get(getFundingsUrl(orcidId))
    const newFundingEntries = page.data.group.filter((fundingEntry) => {
      return fundingEntry['last-modified-date'].value > timestamp
    })
    for (let newFundingEntry of newFundingEntries) {
      result[newFundingEntry['funding-summary'][0]['put-code']] = newFundingEntry['last-modified-date'].value
    }
    return result
  } catch (error) {
    logger(['err', 'orcid-importer', 'get-fuding-id-updates'], JSON.stringify(error))
    throw error
  }
}

const getDetailedFundings = async ({ orcidID, timestamp }) => {
  const putCodes = Object.keys(await getFundingIdUpdates(orcidID, timestamp))
  const result = []
  for (let putCode of putCodes) {
    try {
      const page = await client.get(getDetailedFundingUrl(orcidID, putCode))
      const fundingEntry = page.data
      const entry = {
        type: fundingEntry.type,
        putCode: fundingEntry['put-code'],
        title: fundingEntry['title']['title'].value,
        description: fundingEntry['short-description'],
        amount: {
          value: fundingEntry.amount.value,
          currency: fundingEntry.amount['currency-code']
        },
        lastModified: fundingEntry['last-modified-date'].value,
        projectId: fundingEntry['external-ids']['external-id'][0]['external-id-value'],
        start: {
          year: parseInt(fundingEntry['start-date'].year.value),
          month: parseInt(fundingEntry['start-date'].month.value)
        },
        end: {
          year: parseInt(fundingEntry['end-date'].year.value),
          month: parseInt(fundingEntry['end-date'].month.value)
        },
        organization: {
          name: fundingEntry.organization.name,
          address: {
            city: fundingEntry.organization.address.city,
            country: fundingEntry.organization.address.country
          }
        }
      }
      if (fundingEntry['external-ids']['external-id'][0]['external-id-url']) {
        entry.projectUrl = fundingEntry['external-ids']['external-id'][0]['external-id-url'].value
      }
      result.push(entry)
    } catch (error) {
      logger(['err', 'orcid-importer', 'get-detailed-fundings'], JSON.stringify(error))
      throw error
    }
  }
  return result
}

export default {
  getDetailedWorks,
  getDetailedFundings
}
