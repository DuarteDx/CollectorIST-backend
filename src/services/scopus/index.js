import axios from 'axios'
import { config } from 'porg'

async function getPublicationsFromAuthorID (authorId) {
  const scopusAuthorIdURL = `https://api.elsevier.com/content/search/scopus?query=AU-ID(${authorId})&apiKey=${config.scopus.apiKey}`
  const response = await axios.get(scopusAuthorIdURL, {
    headers: {
      'Accept': 'application/json'
    }
  })
  console.log(response.data)
  return response.data
}

async function getByAuthorID (authorId) {
  const scopusURL = `https://api.elsevier.com/content/author/author_id/${authorId}?apiKey=${config.scopus.apiKey}`
  console.log(scopusURL)
  const response = await axios.get(scopusURL, {
    headers: {
      'Accept': 'application/json'
    }
  })
  return transformAuthorResponse(response.data)
}

function transformAuthorResponse (response) {
  const orcid = response['author-retrieval-response'][0]['coredata']['orcid']
  const preferredName = response['author-retrieval-response'][0]['author-profile']['preferred-name']
  const name = `${preferredName['given-name']} ${preferredName['surname']}`
  return {
    name,
    orcid
  }
}

export default {
  getByAuthorID,
  getPublicationsFromAuthorID
}
