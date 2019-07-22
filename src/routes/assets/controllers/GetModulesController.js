import GetModulesService from '@/services/assets/GetModulesService'

const handler = async (request, h) => {
  return GetModulesService()
}

const config = {
  description: 'Get assets modules',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
