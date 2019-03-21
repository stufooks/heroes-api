const express = require('express')
const parser = require('body-parser')
const heroesController = require('./controllers/heroes')

const app = express()

app.set('port', process.env.PORT || 8080)
app.use(parser.json())
app.use('/heroes', heroesController)

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'))
})