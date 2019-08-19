import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, optionalId) => {
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
      console.log(time + ' DELETE -> Delete optional id')
      console.log(optionalId)

      // Delete asset from DB
      let db = await Mongo.getDB()
      let response = await db.collection('modules').updateOne(
        { moduleName: 'objectIdentification' },
        { $pull: { 'optionalId.values': optionalId } }
      )
      if (response.result.nModified > 0) {
        console.log('Deleted optiona id: ' + optionalId)
      } else {
        console.log('Did not delete any optional id')
      }

      // Create log
      var log = {
        time: today,
        action: 'Delete optional id',
        objectId: optionalId,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Deleted collection: ' + optionalId
    }
  })
}
