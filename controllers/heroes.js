const express = require("express")
const sqlDB = require("../db/mySQL")
const Query = require("../models/Query")
// const redis = require("redis")

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL)
  var client = require("redis").createClient(rtg.port, rtg.hostname)
  client.auth(rtg.auth.split(":")[1])
} else {
  var client = require("redis").createClient();
}

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