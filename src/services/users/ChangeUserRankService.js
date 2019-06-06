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
      console.log(time + ' POST -> Change user rank (' + istId + ')')

      // Remove specified collection from user collections list
      const db = await Mongo.getDB()
      await db.collection('users').updateOne(
        { 'username': istId },
        { '$set': { 'rank': parseInt(newRank) } }
      )

      return 'Changed ' + istId + "'s rank to: " + newRank
    }
  })
}
