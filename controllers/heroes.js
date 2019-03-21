const express = require('express')
const sqlDB = require('../db/mySQL')
const Query = require('../models/Query')

const router = express.Router()

router.get('/', (req, res) => {
  
  Query.create(req.body)

  if(req.body.type && req.body.value) {
    let sql = `SELECT * FROM heroes WHERE ${req.body.type} LIKE '${req.body.value}'`
    sqlDB.query(sql, (err, result) => {
      if(err) {
        res.send('Please check your request formatting.')
      }
      res.json(result)
    })
  } else {
    res.send('Please supply a query type and a search value.')
  }
})

module.exports = router