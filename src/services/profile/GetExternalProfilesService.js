import { Mongo, errorWithKey, config } from 'porg'
import ExternalProfilesSchema from '@/schemas/ExternalProfilesSchema'
import jwt from 'jsonwebtoken'

const providers = ['orcid', 'dblp']

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  const result = {}
  for (let provider of providers) {
    result[provider] = {
      oAuthLink: await getOauthLinkFor({ provider, userId }),
      id: user.externalProfiles && user.externalProfiles[provider] ? user.externalProfiles[provider].id : undefined,
      lastSync: user.externalProfiles && user.externalProfiles[provider] ? user.externalProfiles[provider].lastSync : undefined
    }
  }
  return ExternalProfilesSchema(result)
}

const getOauthLinkFor = async ({ provider, userId }) => {
  if (provider === 'orcid') {
    const nonce = await getNonceFor({ provider, userId })
    return `https://orcid.org/oauth/authorize?client_id=${config.orcid.clientId}&response_type=code&scope=/authenticate&redirect_uri=${config.application.protocol}://${config.application.host}:${config.application.frontendPort}/negotiate-oauth/orcid?nonce=${nonce}`
  } else if (provider === 'scopus') {
    const nonce = await getNonceFor({ provider, userId })
    return `https://scopus.com/oauth/authorize?client_id=${config.scopus.clientId}&response_type=code&scope=/authenticate&redirect_uri=${config.application.protocol}://${config.application.host}:${config.application.frontendPort}/negotiate-oauth/scopus?nonce=${nonce}`
  } else {
    return undefined
  }
}

const getNonceFor = ({ provider, userId }) => {
  return jwt.sign({ sub: provider, userId }, config[provider].jwtSecret, { expiresIn: '2m' })
}
