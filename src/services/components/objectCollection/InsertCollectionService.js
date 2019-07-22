import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, receivedCollection) => {
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
      console.log(time + 'POST -> Insert new collection')

      // Validate input (check if collection title already in database)
      let db = await Mongo.getDB()
      const module = await db.collection('modules').findOne({ moduleName: 'objectCollection' })
      for (let i = 0; i < module.collection.values.length; i++) {
        if (module.collection.values[i].title === receivedCollection.title) {
          return 'Collection already in database! (not inserted)'
        }
      }

      const newCollection = {
        title: receivedCollection.title,
        description: receivedCollection.description,
        users: []
      }

      // Insert collection into DB
      await db.collection('modules').updateOne(
        { moduleName: 'objectCollection' },
        { $push: { 'collection.values': newCollection } }
      )

      // Create log
      var log = {
        time: today,
        action: 'Insert collection',
        objectId: newCollection.title,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Inserted new collection: ' + newCollection.title
    }
  })
}
