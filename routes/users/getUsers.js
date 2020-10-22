const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.get('/users', (req, res) => {
  const result = db.get('users', req.query)
  res.send(result)
})


module.exports = app