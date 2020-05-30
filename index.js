const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

const Game = require('./classes/Game.js').Game;
const Player = require('./classes/Player.js').Player;


// Leena: keep the game state on the server?

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/game/:gameId', function(req, res) {
  res.sendFile(path.join(__dirname + '/game.html'));
});

app.use('/static', express.static('./static/'));


const games = {}; // Leena: move this into a game class
const players = {};

// socket.io related things
io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    delete players[socket.id];
    // Leena: also deal with removing them from all games
    // Leena: remove games when they are over
  });

  socket.on('joinGame', function(opts) {
    const playerId = socket.id;
    const gameId = opts.gameId;

    // figure out if this is a new game or not
    const gameToJoin = games[gameId];
    const player = new Player(playerId, gameId);
    players[playerId] = player;

    if (!gameToJoin) { // starting a new game
      games[gameId] = new Game(gameId, player);
    } else { // joining an existing game
      gameToJoin.addPlayer(player);
    }

    socket.join(gameId);
    socket.broadcast.to(gameId).emit('playerJoined', { playerId })
  })

  socket.on('play:number', function(msg) {
    const gameId = players[socket.id].gameId;
    console.log('number played: ' + msg);
    io.to(gameId).emit('play:number', msg); // emit goes to _all_ sockets
    socket.broadcast.to(gameId).emit('play:number_notSelf', msg); // broadcast goes to all other sockets
  });
});

// end of socket.io related things
const port = process.env.PORT || 4422;
http.listen(port, function() {
  console.log(`listening on *:${port}`);
});




