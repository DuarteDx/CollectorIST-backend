export default (identifier, payload, metadataSets) => {
  const entry = {
    id: identifier,
    identifier: payload.metadata.resource['dc:identifier'],
    sets: getSetsFromCodes(payload.header.setSpec, metadataSets),
    rights: payload.metadata.resource['dc:rights']['_'],
    title: payload.metadata.resource['dc:title']['_'],
    description: payload.metadata.resource['dc:description'].map(descriptionEntry => descriptionEntry['_']),
    keywords: payload.metadata.resource['dc:subject'].map(subjectEntry => subjectEntry['_'])
  }
  if (payload.metadata.resource['datacite:creator']) {
    if (payload.metadata.resource['datacite:creator'].constructor === Array) {
      entry.author = payload.metadata.resource['datacite:creator'].map((creatorEntry) => { return { name: creatorEntry['datacite:creatorName'] } })
    } else {
      entry.author = [{ name: payload.metadata.resource['datacite:creator']['datacite:creatorName'] }]
    }
  }

  if (payload.metadata.resource['dc:publisher']) {
    entry.publisher = payload.metadata.resource['dc:publisher']['_']
  }

  const date = findDate(payload)
  if (date) {
    entry.date = date
  }

  const isbn = findISBN(payload)
  if (isbn) {
    entry.isbn = isbn
  }

  const handle = findHandle(payload)
  if (handle) {
    entry.handle = handle
  }

  if (payload.metadata.file) {
    entry.files = findFiles(payload)
  }
  return entry
}

const findFiles = (payload) => {
  if (payload.metadata.file.constructor === Array) {
    return payload.metadata.file.map((fileEntry) => {
      return {
        url: fileEntry['_'],
        mimeType: fileEntry['$'].mimeType
      }
    })
  } else {
    return [{
      url: payload.metadata.resource.file['_'],
      mimeType: payload.metadata.resource.file['$'].mimeType
    }]
  }
}

const getSetsFromCodes = (setIds, metadataSets) => {
  return setIds.map(setId => metadataSets[setId])
}

const findDate = (payload) => {
  let date
  if (payload.metadata.resource['dc:date']) {
    date = payload.metadata.resource['dc:date']
  } else {
    const filteredEntries = payload.metadata.resource['datacite:date'].filter(entry => entry.$.dateType === 'Issued')
    if (filteredEntries.length === 1) {
      date = filteredEntries[0]['_']
    }
  }
  if (date) {
    const tokens = date.split('-')
    if (tokens.length === 3) {
      return {
        year: tokens[0],
        month: tokens[1]
      }
    }
  } else {
    return null
  }
  return null
}

const findISBN = (payload) => {
  if (payload.metadata.resource['datacite:relatedIdentifier'].constructor === Array) {
    const filteredEntries = payload.metadata.resource['datacite:relatedIdentifier'].filter(entry => entry.$.relatedIdentifierType === 'ISBN')
    if (filteredEntries.length === 1) {
      return filteredEntries[0]['_']
    }
  } else if (payload.metadata['datacite:relatedIdentifier'] && payload.metadata['datacite:relatedIdentifier'].$.relatedIdentifierType === 'ISBN') {
    return null
  }
}
const findHandle = (payload) => {
  if (payload.metadata.resource['datacite:relatedIdentifier'].constructor === Array) {
    const filteredEntries = payload.metadata.resource['datacite:relatedIdentifier'].filter(entry => entry.$.relatedIdentifierType === 'ISBN')
    if (filteredEntries.length === 1) {
      return filteredEntries[0]['_']
    }
  } else if (payload.metadata['datacite:relatedIdentifier'] && payload.metadata['datacite:relatedIdentifier'].$.relatedIdentifierType === 'Handle') {
    return payload.metadata.resource['datacite:relatedIdentifier']['_']
  }
  return null
}
