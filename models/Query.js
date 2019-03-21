const mongoose = require('../db/mongoDB')

const Query = new mongoose.Schema({
  type: String,
  value: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Query', Query)