import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, collectionTitle) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' DELETE -> Delete collection')

      // Validate input
      // ToDo?...

      // Delete asset from DB
      let db = await Mongo.getDB()
      let response = await db.collection('modules').updateOne(
        { moduleName: 'objectCollection' },
        { $pull: { 'collection.values': { title: collectionTitle } } }
      )
      if (response.result.nModified > 0) {
        console.log('Deleted collection: ' + collectionTitle)
      } else {
        console.log('Did no delete any collection')
      }

      // Create log
      var log = {
        time: today,
        action: 'Delete collection',
        objectId: collectionTitle,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Deleted collection: ' + collectionTitle
    }
  })
}
