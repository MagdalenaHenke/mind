function getGameId() {
  const gameUrlPath = '/game/'
  return window.location.pathname.substring(window.location.pathname.indexOf(gameUrlPath) + gameUrlPath.length)
}

// Leena: maybe just do it without jquery
$(function() {
  var socket = io();

  // emit socket event when number is submitted
  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    const number = $('#numberInput').val();
    socket.emit('play:number', number);
    $('#numbersPlayedByMeBefore').append($('<li>').text(number));
    $('#numberInput').val('');
    return false;
  });

  // do stuff when other socket emits a thing
  socket.on('play:number', function(msg) {
    $('#allNumbersPlayedBefore').append($('<li>').text(msg));
  });

  // checking how the broadcasting work
  socket.on('play:number_notSelf', function(msg) {
    $('#numbersPlayedByOthersBefore').append($('<li>').text(msg));
  });

  socket.on('connect', function() {
    const gameId = getGameId();
    socket.emit('joinGame', { gameId }); // Leena: standardize event names
  });

  socket.on('playerJoined', function(opts) {
    console.log('player', opts.playerId, 'joined');
  })

  socket.on('mistakeMade'), function(opts) {
    console.log('mistakeMade', opts.cardPlayed);
    // todo: remove all cards below the mistake made one
  }
});
