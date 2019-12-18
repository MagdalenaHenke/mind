var app = require('express')();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// socket.io related things
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('number pick', function(msg) {
    console.log('message: ' + msg);
    io.emit('number pick', msg); // emit goes to _all_ sockets
    socket.broadcast.emit('hi', msg); // broadcast goes to all other sockets
  });
});

// end of socket.io related things

http.listen(4422, function() {
  console.log('listening on *:4422');
});
