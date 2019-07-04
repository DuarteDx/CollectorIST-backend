import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (collection, token) => {
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
      console.log(time + ' POST -> Insert single collection (title: ' + collection.title + ')')

      // Insert collection into DB
      let db = await Mongo.getDB()
      var newCollection = {
        title: collection.title,
        responsible: collection.responsible,
        description: collection.description
      }
      await db.collection('collections').insertOne(newCollection)

      // Create log
      var log = {
        time: today,
        action: 'Insert collection',
        objectId: newCollection._id,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Inserted new collection with id: ' + newCollection.id
    }
  })
}
