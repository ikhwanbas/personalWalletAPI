const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authorization = require('../../middleware/authorizationMiddleware')

app.use(authorization)

app.post('/expensescategory', (req, res) => {
  const body = req.body
  const result = db.add('expensesCategory', body)
  console.log(body);
  if (!result) {
    res.status(400).send('Wrong body')
  } else {
    res.send(result)
  }
  return
})

module.exports = app