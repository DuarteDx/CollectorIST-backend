import DBLP from 'dblp-json'
import SaveResearcherDBLPKeyService from '../researchers/SaveResearcherDBLPKeyService'
import SaveResearcherScopusAuthorIDService from '../researchers/SaveResearcherScopusAuthorIDService'

export default async ({ provider, userId, key }) => {
  switch (provider) {
    case 'dblp': return SaveResearcherDBLPKeyService({ userId, key })
    case 'scopus': return SaveResearcherScopusAuthorIDService({ userId, key })
  }
}
