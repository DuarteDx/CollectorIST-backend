import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

export default async (token, assetId) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      console.log(decodedToken)
      if (!decodedToken.newUserToken2.role.admin && !decodedToken.newUserToken2.role.editor) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' DELETE -> Single asset (id: ' + assetId + ')')

      // Delete collection from DB
      let db = await Mongo.getDB()
      await db.collection('assets').deleteOne({ _id: ObjectId(assetId) })

      // Create log
      var log = {
        time: today,
        action: 'Delete asset',
        objectId: assetId,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Deleted asset with id: ' + assetId
    }
  })
}
