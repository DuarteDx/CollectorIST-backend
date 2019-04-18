import Scopus from '@/services/scopus'
import GetUserFromUserId from '../users/GetUserFromUserId'
import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, key }) => {
  let user = await GetUserFromUserId({ userId })
  const userScopusInfo = await Scopus.getByAuthorID(key)

  if (orcidMatch(userScopusInfo.orcid, user.externalProfiles.orcid ? user.externalProfiles.orcid.id : null) ||
        nameMatch(userScopusInfo.name, user.name)) {
    let db = await Mongo.getDB()
    const settingQuery = {
      externalProfiles: user.externalProfiles
    }
    settingQuery.externalProfiles['scopus'] = { id: key, lastSync: undefined }
    user = await db.collection('users').findOneAndUpdate({ '_id': userId }, { $set: settingQuery })
    if (!user) {
      throw errorWithKey('researcher-not-found', { ctx: { userId } })
    }
    return { key }
  } else {
    throw errorWithKey('names-dont-match', {
      tags: ['error', 'save-external-profile-key'],
      ctx: { profileName: user.name, externalProfileName: userScopusInfo.name },
      metadata: { provider: 'scopus', userId, key, profileName: user.name, externalProfileName: userScopusInfo.name }
    })
  }
}

function orcidMatch (orcidA, orcidB) {
  return orcidA === orcidB
}

function nameMatch (nameA, nameB) {
  const nameATokens = nameA.split(' ')
  const nameBTokens = nameB.split(' ')
  return nameATokens[0].toUpperCase() === nameBTokens[0].toUpperCase() &&
        nameATokens[nameATokens.length - 1].toUpperCase() === nameBTokens[nameBTokens.length - 1].toUpperCase()
}
