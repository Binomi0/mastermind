import { createContext } from 'react';

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const defaultGameContext = {
  result: [],
  playerName: '',
  availableColors: [],
  level: '',
  setPlayerName(playerName) {
    this.playerName = playerName;
  },
  resetGame(level) {
    this.availableColors = [...level.items];
    this.result = shuffle(level.items).splice(0, 4);
    this.level = level.name;
  },
};

export const GameContext = createContext(defaultGameContext);
