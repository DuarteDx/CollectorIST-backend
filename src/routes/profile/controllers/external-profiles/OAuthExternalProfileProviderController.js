import Joi from 'joi'
import axios from 'axios'
import qs from 'querystring'
import { config as porgConfig } from 'porg'
import SaveResearcherOrcidService from '@/services/researchers/SaveResearcherOrcidService'
import jwt from 'jsonwebtoken'

const handler = async (request, h) => {
  const code = request.query.code
  const nonce = request.query.nonce
  const provider = request.params.provider
  const decoded = jwt.verify(nonce, porgConfig.orcid.jwtSecret)
  if (provider === 'orcid' && decoded.sub === provider && decoded.userId === request.getPrincipal().username) {
    const orcid = await getOrcidFromCode({ code, nonce })
    return SaveResearcherOrcidService({ userId: request.getPrincipal().username, orcid })
  } else {
    return {}
  }
}

async function getOrcidFromCode ({ nonce, code }) {
  const client = axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  })
  const response = await client.post('https://orcid.org/oauth/token', qs.stringify({
    client_id: porgConfig.orcid.clientId,
    client_secret: porgConfig.orcid.clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${porgConfig.application.protocol}://${porgConfig.application.host}:${porgConfig.application.frontendPort}/negotiate-oauth/orcid?nonce=${nonce}`
  }))
  return response.data.orcid
}

const config = {
  description: 'Handle external profile from OAuth provider',
  validate: {
    params: {
      provider: Joi.string().valid(['orcid', 'scopus']).required()
    },
    query: {
      code: Joi.string().required(),
      nonce: Joi.string().required()
    }
  },
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default {
  handler,
  config
}
