const jwt = require('jsonwebtoken')

export default async ({ asset }) => {
  console.log(asset.token)
  return jwt.verify(asset.token, 'secretKey', { expiresIn: '7d' })
}

/* export default async ({ asset }) => {
  console.log(asset.token)
  return jwt.verify(asset.token, 'secretkey', (err, authData) => {
    console.log('inside jwt method')
    // console.log(asset.token)
    console.log(err)
    if (err) {
      return '403 Forbidden!'
    } else {
      return {
        message: 'Permission granted!',
        authData
      }
    }
  })
} */
