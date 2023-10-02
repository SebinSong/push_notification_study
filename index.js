const express = require('express')
const webpush = require('web-push')
const path = require('path')

const PORT = 5000

// import keys
const { publicKey, privateKey } = require('./keys.json')

// create app instance
const app = express()

webpush.setVapidDetails(
  'mailto:songxevin@gmail.com',
  publicKey,
  privateKey
)

app.use(express.json())
app.post('/subscribe', async (req, res) => {
  const subscription = req.body

  // create payload
  const payload = JSON.stringify({ title: 'Push test' })

  try {
    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload)
  } catch (err) {
    console.error('error while sending notification: ', err)
  }
})

app.use(express.static(path.join(__dirname, 'client')))

app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })