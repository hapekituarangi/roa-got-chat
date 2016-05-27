const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html')
})

var connections = 0
io.on('connection', function(socket) {
  var username = ''
  connections++

  socket.on('username', function(user) {
    username = user
    socket.broadcast.emit('chat message', username + ' just joined the chat. There are now ' + connections.toString() + ' people in the room')
  })

  socket.on('chat message', function(msg) {
    console.log('message: ', msg)
    io.emit('chat message', username + ': ' + msg)
  })

  console.log('a user connected')
  socket.on('disconnect', function() {
    connections--
    socket.broadcast.emit('chat message', username + ' just left the chat. There are now ' + connections.toString() + ' people in the room')
    console.log('a user disconnected')
  })
})

http.listen(3000, function() {
  console.log('chat running on 3000')
})