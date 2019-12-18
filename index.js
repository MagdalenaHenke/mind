var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static', express.static('./static/'));

// socket.io related things
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('play:number', function(msg) {
    console.log('number played: ' + msg);
    io.emit('play:number', msg); // emit goes to _all_ sockets
    socket.broadcast.emit('play:number_notSelf', msg); // broadcast goes to all other sockets
  });
});

// end of socket.io related things

http.listen(4422, function() {
  console.log('listening on *:4422');
});
