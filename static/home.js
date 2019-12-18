$(function() {
  let gameId = null;

  function randomId() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

  function generateGame(evt) {
    gameId = randomId();
    const gameLink = '/game/' + gameId;
    $('#gameLink')
      .attr('href', gameLink)
      .removeClass('is-hidden');
    return gameId;
  }

  $('#startGameButton').click(generateGame);
});
