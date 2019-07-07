import React, { Component } from 'react';

import db from '../../config/firebase';
import Records from '../Records';
import { GameContext } from '../../context/game';
import './gameFinish.scss';

export default class GameFinish extends Component {
  static contextType = GameContext;

  componentDidMount() {
    const { scoreManager } = this.context;

    const scoreRef = db.ref(`score/${this.context.playerName}`);
    scoreRef.on('value', (snapshot) => {
      if (snapshot.val().score < scoreManager.score) {
        alert('has superado tu record');
        scoreRef.set(scoreManager);
      }
    });
  }

  render() {
    const { status } = this.props;
    return (
      <GameContext.Consumer>
        {({ scoreManager, resetGame, activeColumn, playerName }) => (
          <div className="game-finish">
            {status === 'win' ? <h1>Has Ganado!</h1> : <h1>Has Perdido...</h1>}

            <p>
              ¡{playerName}, has conseguido {scoreManager.score} puntos, en{' '}
              {scoreManager.time} segundos y {activeColumn} columnas!
            </p>
            <button className="finish-button" onClick={resetGame}>
              Jugar otra vez
            </button>

            <Records />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
