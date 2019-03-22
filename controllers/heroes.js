const express = require("express")
const sqlDB = require("../db/mySQL")
const Query = require("../models/Query")
const redis = require("redis")

const client = redis.createClient()

const router = express.Router()

router.get("/", (req, res) => {
  if (req.body.type && req.body.value) {
    Query.findOne({$and: [{ type: req.body.type }, { value: req.body.value }]})
      .then(query => {
        if (query &&  query.timestamp > Date.now() - 86400000) {
          let key = query._id.toString()
          client.get(key, (err, result) => {
            if (err) {
              throw err
            }
            res.json(JSON.parse(result))
          })
        } else {
          Query.create(req.body)
            .then(newQuery => {
              let sql = `SELECT * FROM heroes WHERE ${req.body.type} LIKE '${req.body.value}'`
              sqlDB.query(sql, (err, result) => {
                if (err) {
                  res.send("Please check your request formatting.")
                  return
                }
                let key = newQuery._id.toString()
                let data = JSON.stringify(result)
                client.set(key, data)
                client.expire(key, 86400)
                res.json(result)
              })
            })
        }
    })
  } else {
    res.send("Please supply a query type and a search value.")
  }
})

module.exports = router
