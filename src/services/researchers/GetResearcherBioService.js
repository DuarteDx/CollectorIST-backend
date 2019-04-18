import GetResearcherService from '@/services/researchers/GetResearcherService'
import { errorWithKey } from 'porg'

export default async ({ userId }) => {
  const researcher = await GetResearcherService({ userId })
  if (!researcher.bio && !researcher.bio.extended) {
    throw errorWithKey('researcher-bio-not-found', { ctx: userId })
  }
  return researcher.bio
}
