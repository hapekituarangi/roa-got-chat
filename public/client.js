$('#myChats').add("script").attr("src", "/socket.io/socket.io.js")

$('#myChats').append("<form id='enterName'>"+
     "<input id='username' type='text' placeholder='Enter your name'/><button>Enter chat</button>"+
    "</form>"+
    "<ul id='messages'></ul>"+
    "<form id='chats' action=''>"+
      "<input id='m' autocomplete='off' /><button>Send</button>"+
    "</form>")

var socket = io();
$('#enterName').submit(function(e) {
  e.preventDefault()
  var user = $('#username').val()
  socket.emit('username', user)
  $('#enterName').hide()
})
$('#chats').submit(function(e) {
  e.preventDefault()
  console.log('hello')
  socket.emit('chat message', $('#m').val())
  $('#m').val('')
  return false
})
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg))
})