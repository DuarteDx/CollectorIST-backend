import { Mongo, errorWithKey } from 'porg'
const jwt = require('jsonwebtoken')

export default async (token, istId, collectionName) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' DELETE -> Collection from user (' + istId + ')')

      // Remove specified collection from user collections list
      const db = await Mongo.getDB()
      await db.collection('users').updateOne(
        { 'username': istId },
        { '$pull': { 'collections': collectionName } }
      )

      return 'Removed collection: ' + collectionName
    }
  })
}
