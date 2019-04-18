import DBLP from 'dblp-json'
import GetUserFromUserId from '../users/GetUserFromUserId'
import { Mongo, errorWithKey } from 'porg'

const dblp = new DBLP()

export default async ({ userId, key }) => {
  let user = await GetUserFromUserId({ userId })
  const userDBLPInfo = await dblp.getByHomepage(key)
  const dblpNameTokens = userDBLPInfo.dblpperson.name.split(' ')
  const scholarNameTokens = user.name.split(' ')
  if (dblpNameTokens[0].toUpperCase() === scholarNameTokens[0].toUpperCase() &&
        dblpNameTokens[dblpNameTokens.length - 1].toUpperCase() === scholarNameTokens[scholarNameTokens.length - 1].toUpperCase()) {
    let db = await Mongo.getDB()
    const settingQuery = {
      externalProfiles: user.externalProfiles
    }
    settingQuery.externalProfiles['dblp'] = { id: key, lastSync: undefined }
    user = await db.collection('users').findOneAndUpdate({ '_id': userId }, { $set: settingQuery })
    if (!user) {
      throw errorWithKey('researcher-not-found', { ctx: { userId } })
    }
    return { key }
  } else {
    throw errorWithKey('names-dont-match', {
      tags: ['error', 'save-external-profile-key'],
      ctx: { profileName: user.name, externalProfileName: userDBLPInfo.dblpperson.name },
      metadata: { provider: 'dblp', userId, key, profileName: user.name, externalProfileName: userDBLPInfo.dblpperson.name }
    })
  }
}
