'use strict'

let express = require('express')
let path = require('path')
let http = require('http')
let request = require('request')
let bodyParser = require("body-parser")

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('trust proxy', true)
app.set('x-powered-by', false)
app.set('view cache', true)


app.get('/famous', function (req, res, next) {
  // set url and headers
  let options = {
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous",
    headers: {
      'X-Mashape-Key': 'YUMpis6bbJmshWRlcAirUlH1HuKxp1fd6xUjsnwjqY1rwe3CKj',
      'Accept': "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  // get quotes
  request(options, (err, resp, body) => {
    res.send(JSON.parse(body))
  })
})


app.get('/compsci', function (req, res, next) {
  request({url: 'http://quotes.stormconsultancy.co.uk/random.json'}, (err, resp, body) => {
    res.send(body)
  })
})


app.get('/got', function (req, res, next) {
  request({url: 'https://got-quotes.herokuapp.com/quotes'}, (err, resp, body) => {
    res.send(body)
  })
})


app.get('/cn', function (req, res, next) {
  request({url: 'https://api.chucknorris.io/jokes/random'}, (err, resp, body) => {
    res.send(body)
  })
})


// create server object
let server = http.createServer(app)
// booting up server function
let boot = function() {
  server.listen(port, function() {
    console.log('Express server listening on port', port)
  })
}
// shutdown server function
let shutdown = function() {
  server.close()
}

// if main module then start server else pass to exports
if(require.main === module){
  boot()
} else {
  console.log('Running quotegen app as module')
  module.exports = {
    boot: boot,
    shutdown: shutdown,
    port: port,
    server: server,
    app: app
  }
}
