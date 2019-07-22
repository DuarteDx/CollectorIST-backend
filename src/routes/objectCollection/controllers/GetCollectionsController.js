import GetCollectionsService from '@/services/components/objectCollection/GetCollectionsService'

const handler = async (request, h) => {
  return GetCollectionsService()
}

const config = {
  description: 'Get collections from database',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
