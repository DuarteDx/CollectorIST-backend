import DeleteUserService from '@/services/users/DeleteUserService'
// import Joi from 'joi'

const handler = async (request, h) => {
  console.log(request.payload)
  return DeleteUserService({
    id: request.payload._id
  })
}

const config = {
  description: 'Delete an users',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
