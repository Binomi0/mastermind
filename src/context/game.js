import React from 'react';
import rules from '../utils/rules';

const defaultValue = {
  selectedColor: 'white',
  result: [],
  resetGame() {
    this.result = rules();
    return this.result;
  },
};

export const GameContext = React.createContext(defaultValue);
