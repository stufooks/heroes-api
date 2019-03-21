const mysql = require('mysql')

if(process.env.NODE_ENV == "production") {
  var conn = mysql.createPool({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'ba20d681ff7bcc',
    password: 'dbecb407',
    database: 'heroku_591606f80109af5'
  })
} else {
  var conn = mysql.createPool({
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodeuser',
    database: 'heroes_api'
  })
}

// conn.connect(function(err) {
//   if (err){ 
//     throw err
//   }
// })

module.exports = conn

'mysql://ba20d681ff7bcc:dbecb407@us-cdbr-iron-east-03.cleardb.net/heroku_591606f80109af5?reconnect=true'