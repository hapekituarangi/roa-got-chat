
$('#myChats').append("<script src='/socket.io/socket.io.js'></script>")

$('#myChats').append("<form id='enterName'>"+
     "<input id='username' type='text' placeholder='Enter your name'/><button>Enter chat</button>"+
    "</form>"+
    "<ul id='messages' ></ul>"+
    "<form id='chats' action='' style='display:none'>"+
      "<input id='m' autocomplete='off' /><button>Send</button>"+
    "</form>")

var socket = io()
$('#enterName').submit(function(e) {
  e.preventDefault()
  if (/[a-z, A-Z, 0-9]/g.test($('#username').val())) {
    //socket = io()
    initiateChat()
  }
})
function initiateChat() {
  var user = $('#username').val()
  socket.emit('username', user)
  $('#enterName').hide()
  $('#chats').show()
  $('#messages').show()
  $('#chats').submit(function(e) {
    e.preventDefault()
    socket.emit('chat message', $('#m').val())
    $('#messages').append($('<li class="you">').text('You: '+$('#m').val()))
    // socket.broadcast.emit('chat message', $('#m').val())
    $('#m').val('')
    return false
  })

  socket.on('chat message', function(msg) {
    var li = $('<li class="them"/>')
    var num = 0
    msg.split("")
      .forEach((letter) => {
        var p = $("<p/>", {
          "text": letter,
          "class": "l-letters l-letters-" + num++ % 6
        })
        $(li).append(p)
      })
      $('#messages').append(li)

  })
}
