var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);
var _ = require('lodash'); // Leena: do I need lodash?

// Leena: keep the game state on the server?
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render(path.join(__dirname + '/home.pug'));
});

app.get('/game/:gameId', function(req, res) {
  res.render(path.join(__dirname + '/game.pug'));
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

http.listen(4422, function() {
  console.log('listening on *:4422');
});

class Player { // LEENA: you know, move this into some other files
  constructor(playerId, gameId) { // LEENA: also name and stuff?
    this.playerId = playerId;
    this.gameId = gameId;
    this.cards = [];
  }
}

class Game { // Leena: you know, move into some other file
  constructor(gameId, player) {
    this.gameId = gameId;
    this.players = [player];
    this.lives = 5; // LEENA: update this
  }

  addPlayer(player) {
    this.players.push(player);
  }
}



