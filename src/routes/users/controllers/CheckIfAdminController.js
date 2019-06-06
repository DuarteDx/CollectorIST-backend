import CheckIfAdminService from '@/services/users/CheckIfAdminService'

const handler = async (request, h) => {
  const isAdmin = await CheckIfAdminService(request.params.token)
  return isAdmin
}

const config = {
  description: 'Indicates if current user is admin or not (true or false)',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
