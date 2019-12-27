class Game { // Leena: you know, move into some other file
  constructor(gameId, player) {
    this.gameId = gameId;
    this.players = [player];
    this.lives = 5; // LEENA: update this
    this.level = 0;
    this.cardsInTheGame = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  gameIsLost() {
    return this.lives === 0;
  }

  addLife() {
    return this.lives += 1;
  }

  loseLife() {
    return this.lives -= 1;
  }

  checkMove(cardPlayed) {
    if (cardPlayed > cardsInGame[0]) {
      this.loseLife();
      io.to(this.gameId).emit('mistakeMade', { cardPlayed }); // Leena: check and adjust this
    }
  }

  dealOutCards() {
    // todo: shuffle deck, assign cards to each player, set `cardsInGame` and sort
  }
}

exports.Game = Game; // Leena: maybe do this better with some defaults

