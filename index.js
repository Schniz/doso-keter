console.log('hello')

const http = require('http')

http.createServer((req, res) => {
  console.log("got a response")
  res.end("hello")
}).listen(8080)
