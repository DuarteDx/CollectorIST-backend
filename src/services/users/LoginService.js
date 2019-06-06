import { Mongo } from 'porg'
const jwt = require('jsonwebtoken')
const axios = require('axios')

export default async ({ istTokens }) => {
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' POST -> Login')

  // Get DB
  let db = await Mongo.getDB()

  // Get ist username based on given ist access_token and refresh_token
  var getUserIstInfoUrl = 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token=' + istTokens.access_token + '&refresh_token=' + istTokens.refresh_token
  var userIstInfo = await axios.get(getUserIstInfoUrl)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  // console.log(userIstInfo)

  // Find platform with such username
  const user = await db.collection('users').findOne({ 'username': userIstInfo.username })

  // If user has never logged in before we add him to the database
  if (!user) {
    // Insert in DB
    // Ranks: 0->Viewer 1->Editor 2->Admin
    const newUser = {
      'username': userIstInfo.username,
      'name': userIstInfo.name,
      'picture': userIstInfo.photo,
      'rank': 0,
      'collections': null
    }
    await db.collection('users').insertOne(newUser)

    const newUserToken = {
      'username': userIstInfo.username,
      'name': userIstInfo.name,
      'rank': 0,
      'collections': null
    }

    var jwtToken = jwt.sign({ newUserToken }, 'secretKey', { expiresIn: '1d' })

    // Create log
    var log = {
      time: today,
      action: 'Create user',
      id: userIstInfo.username
    }
    await db.collection('logs').insertOne(log)
    return jwtToken
  } else {
    // Create log
    var log2 = {
      time: today,
      action: 'User login',
      id: user.username
    }
    await db.collection('logs').insertOne(log2)

    var jwtToken2 = jwt.sign({ user }, 'secretKey', { expiresIn: '1d' })
    return jwtToken2
  }
}
