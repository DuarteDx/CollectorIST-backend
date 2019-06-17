import { Mongo, errorWithKey } from 'porg'
const jwt = require('jsonwebtoken')

export default async (token, istId, newRank) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' POST -> Change user rank (' + istId + ') to: ' + newRank)

      // Remove specified collection from user collections list
      const db = await Mongo.getDB()

      // Convert from string to int
      newRank = parseInt(newRank)

      // Update user in database
      switch (newRank) {
        case 0:
          await db.collection('users').updateOne(
            { 'username': istId },
            { '$set': { 'role.admin': false, 'role.editor': false, 'role.collections': [] } }
          )
          break
        case 1:
          await db.collection('users').updateOne(
            { 'username': istId },
            { '$set': { 'role.admin': false, 'role.editor': true } }
          )
          break
        case 2:
          await db.collection('users').updateOne(
            { 'username': istId },
            { '$set': { 'role.admin': true, 'role.editor': false, 'role.collections': [] } }
          )
          break
      }

      return 'Changed ' + istId + "'s rank to: " + newRank
    }
  })
}
