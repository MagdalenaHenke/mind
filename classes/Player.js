// Leena: share this player class with front end
class Player { // LEENA: you know, move this into some other files
  constructor(playerId, gameId) { // LEENA: also name and stuff?
    this.playerId = playerId;
    this.gameId = gameId;
    this.cards = [];
  }
}

exports.Player = Player;