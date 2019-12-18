$(function() {
  var socket = io();

  // todo: move all this out of the script tag at some point ;)

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
});
