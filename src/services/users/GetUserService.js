import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'
const jwt = require('jsonwebtoken')

export default async (token, istId) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' GET -> Single user (' + istId + ')')

      // Fetch data from DB
      const db = await Mongo.getDB()
      const user = await db.collection('users').findOne({ 'username': istId })
      if (!user) {
        throw errorWithKey('users-not-found')
      }

      return NormalizeObject(user)
    }
  })
}
