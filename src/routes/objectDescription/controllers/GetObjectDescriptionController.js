import GetObjectDescriptionService from '@/services/components/objectDescription/GetObjectDescriptionService'

const handler = async (request, h) => {
  return GetObjectDescriptionService()
}

const config = {
  description: 'Get object description module',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
