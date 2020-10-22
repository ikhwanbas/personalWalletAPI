const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const expensesCategoryModel = require('../model/expensesCategory')
const expensesModel = require('../model/expensesModel')
const incomeModel = require('../model/incomeModel')
const usersModel = require('../model/usersModel')
const walletModel = require('../model/walletModel')
const usersLoginModel = require('../model/usersLoginModel')
// ⚠️ propietary code, don't change it ⚠️
// this code will create db.json automatically if your folder doesn't have one
// courious? 👀 search for "IIFE function"
let db;
(async () => {
  try {
    const fs = require('fs')
    const util = require('util')
    const readdir = util.promisify(fs.readdir)
    const path = require('path').resolve()
    const dir = await readdir(path)
    if (!dir.includes('db.json'))
      fs.writeFile(path + 'db.json', '', () => 1)

    const adapter = new FileSync('db.json')
    db = low(adapter)
    db.defaults({
      expensesCategory: [],
      expenses: [],
      income: [],
      users: [],
      wallet: [],
      usersLogin: []
    })
      .write()
  } catch (error) {
    console.log(error);
  }
})()

function shapeObject(input, model) {
  const result = {}
  const modelCounter = model.length
  let counter = 0
  for (const namaKey in input) {
    if (model.includes(namaKey)) {
      result[namaKey] = input[namaKey]
      counter++
    }
  }
  if (counter < modelCounter) {
    return false
  }
  return result
}

/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */
function get(tableName, query) {
  if (query && Object.keys(query).length) {
    return db
      .get(tableName)
      .find(query)
      .value()
  }
  return db
    .get(tableName)
    .value()

}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
  let shapedBody

  if (tableName == 'expensesCategory') {
    shapedBody = shapeObject(body, expensesCategoryModel)
  }
  if (tableName == 'expenses') {
    shapedBody = shapeObject(body, expensesModel)
  }
  if (tableName == 'income') {
    shapedBody = shapeObject(body, incomeModel)
  }
  if (tableName == 'users') {
    shapedBody = shapeObject(body, usersModel)
  }
  if (tableName == 'wallet') {
    shapedBody = shapeObject(body, walletModel)
  }
  if (tableName == 'usersLogin') {
    shapedBody = shapeObject(body, usersLoginModel)
  }
  if (!shapedBody) {
    return false
  }
  return db.get(tableName)
    .push(shapedBody)
    .write()
}

/**
 * Add a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 * @param {Object} body updated data
 */
function edit(tableName, id, body) {
  const parsedId = parseInt(id)
  db.get(tableName)
    .find({ id: parsedId })
    .assign(body)
    .write()
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
  const parsedId = parseInt(id)
  db.get(tableName)
    .remove({ id: parsedId })
    .write()
}

/**
 * Remove all data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function removeAll(tableName) {
  db.get(tableName)
    .remove({})
    .write()
}

module.exports = {
  get,
  add,
  edit,
  remove,
  removeAll
}