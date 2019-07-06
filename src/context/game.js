import React from 'react';

import rules from '../utils/rules';

const defaultGameContext = {
  result: [],
  resetGame() {
    this.result = rules(4);
    return this.result;
  },
};

export const GameContext = React.createContext(defaultGameContext);
