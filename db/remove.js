const conn = require('./mySQL')

conn.query('DELETE FROM heroes', (err, result) => {
  if(err) throw err;
})