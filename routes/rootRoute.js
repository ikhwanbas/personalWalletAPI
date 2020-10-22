const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.get('/', (req, res) => {
  res.send("Hello world! This is personal wallet API")
})

module.exports = app