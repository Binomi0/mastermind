import { createContext } from 'react';
import { shuffle } from '../utils/helpers';

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
