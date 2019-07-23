import GetObjectIdentificationConfigService from '@/services/components/objectIdentification/GetObjectIdentificationConfigService'

const handler = async (request, h) => {
  return GetObjectIdentificationConfigService()
}

const config = {
  description: 'GET object identification config values',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
