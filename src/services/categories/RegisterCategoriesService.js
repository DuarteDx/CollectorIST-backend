import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (categories, token) => {
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
      console.log(time + ' POST -> Insert all categories')
      console.log(categories)

      // await db.collection('categories').insertOne(newCollection)

      // Checks if categories already in db and adds them if not
      // Only works for the 1st and 2nd level of the json tree!
      let db = await Mongo.getDB()
      categories.forEach(async function (insertParent) {
        var dbCategory = await db.collection('categories').find({ title: insertParent.title }).toArray()
        if (dbCategory.length > 0) {
          console.log('Category ' + insertParent.title + ' already exists!')
          // console.log('Subcategories: ')
          if (insertParent.subCategories.length > 0) {
            insertParent.subCategories.forEach(async function (insertChild) {
              // console.log(dbCategory[0].subCategories)
              // console.log(insertChild)
              var dbSubcategoryTitles = []
              dbCategory[0].subCategories.forEach(function (dbSubCategory) {
                dbSubcategoryTitles.push(dbSubCategory.title)
              })
              if (dbSubcategoryTitles.includes(insertChild.title)) {
                console.log('Child ' + insertChild.title + ' already in ' + dbCategory[0].title)
                console.log('\n')
              } else {
                console.log('Adding ' + insertChild.title + ' into ' + dbCategory[0].title)
                console.log('\n')
                await db.collection('categories').updateOne(
                  { title: dbCategory[0].title },
                  { $push: { subCategories: insertChild } }
                )
              }
              dbSubcategoryTitles = []
            })
          }
        } else {
          console.log('category ' + insertParent.title + ' doesnt exist yet, inserting into db')
          await db.collection('categories').insertOne(insertParent)
        }
      })

      // Create log
      var log = {
        time: today,
        action: 'Insert categoryies',
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Updated list of categories'
    }
  })
}
