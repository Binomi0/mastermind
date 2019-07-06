import React from 'react';
import rules from '../utils/rules';

const defaultGameContext = {
  selectedColor: 'white',
  movement: 0,
  result: [],
  resetGame() {
    this.result = rules();
    return this.result;
  },
  activeColumn: 0,
  turn: [0, 0, 0, 0],
  gameWin: false,
  gameLost: false,
  score: 0,
  validation: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  },
};

export const GameContext = React.createContext(defaultGameContext);
