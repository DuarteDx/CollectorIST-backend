import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

export default async (token, assetId, newObjectCollection) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin && !decodedToken.newUserToken2.role.editor) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' POST -> Edit asset Object Collection')

      // Validate input
      // ToDo...

      // Insert asset into DB
      let db = await Mongo.getDB()
      await db.collection('assets').updateOne(
        { _id: ObjectId(assetId) },
        {
          $set: { 'ObjectLocation': { collection: newObjectCollection } },
          $currentDate: { lastModified: true }
        }
      )

      // Create log
      var log = {
        time: today,
        action: 'Edit object colelction',
        objectId: assetId,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Edited asset Object Collection with _id: ' + assetId
    }
  })
}
