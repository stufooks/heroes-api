const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'nodeuser',
  database: 'heroes_api'
})

conn.connect(function(err) {
  if (err){ 
    throw err
  }
})

module.exports = conn