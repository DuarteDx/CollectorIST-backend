import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'
const jwt = require('jsonwebtoken')

export default async (token) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' GET -> Users List (Admin)')

      // Fetch data from DB
      const db = await Mongo.getDB()
      const users = await db.collection('users').find({}).toArray()
      if (!users) {
        throw errorWithKey('users-not-found')
      }

      return NormalizeObject(users)
    }
  })
}
