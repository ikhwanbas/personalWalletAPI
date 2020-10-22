const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')

const addUsers = require('./routes/users/addUsers')
const getUsers = require('./routes/users/getUsers')

const addWallet = require('./routes/wallet/addWallet')
const getWallet = require('./routes/wallet/getWallet')

const addIncome = require('./routes/income/addIncome')
const getIncome = require('./routes/income/getIncome')

const addExpenses = require('./routes/expenses/addExpenses')
const getExpenses = require('./routes/expenses/getExpenses')

const addExpensesCategory = require('./routes/expensesCategory/addExpensesCategory')
const getExpensesCategory = require('./routes/expensesCategory/getExpensesCategory')

const app = express()
app.use(bodyParser.json())

app.use(rootRoute)
app.use(registerRoute)
app.use(loginRoute)

app.use(addUsers)
app.use(getUsers)

app.use(addWallet)
app.use(getWallet)

app.use(addIncome)
app.use(getIncome)

app.use(addExpenses)
app.use(getExpenses)

app.use(addExpensesCategory)
app.use(getExpensesCategory)

const port = 3000
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
})
