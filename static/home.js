$(function() {
  function getGameLink(gameId) {
    return window.location.href + 'game/' + gameId;
  }

  function randomId() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

  function generateGame(evt) {
    gameId = randomId();
    gameLink = getGameLink(gameId);
    $('#newGameLink')
      .attr('href', gameLink)
      .text(gameLink);

    $('#newGameText')
      .removeClass('is-hidden')
  }

  $('#startGameButton').click(generateGame);
});
