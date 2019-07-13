import React, { Component } from 'react';
import Confetti from 'react-dom-confetti';

import db from '../../config/firebase';
import Records from '../Records';
import { GameContext } from '../../context/game';
import * as levels from '../../utils/constants';
import './gameFinish.scss';

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 100,
  dragFriction: 0.1,
  duration: 6000,
  stagger: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export default class GameFinish extends Component {
  static contextType = GameContext;

  state = {
    status: null,
  };

  componentDidMount() {
    const { scoreManager } = this.context;

    const scoreRef = db.ref(`score/${this.context.playerName}`);
    scoreRef.on('value', (snapshot) => {
      if (snapshot.val().score < scoreManager.score) {
        alert('has superado tu record');
        scoreRef.set(scoreManager);
      }
    });
    this.setState({ status: this.props.status });
  }

  handleResetGame = () => {
    const { level } = this.context;
    const items = [...levels[level]];

    this.context.handleResetGame({ items, name: level });
  };

  render() {
    const { status } = this.state;
    console.log('status', status);
    return (
      <GameContext.Consumer>
        {({ scoreManager, activeColumn, playerName, gameWin, gameLost }) => (
          <div className="game-finish">
            <Confetti active={status} config={config} />
            <Confetti active={status} config={config} />
            {gameWin && <h1>Has Ganado!</h1>}
{gameLost && <h1>Has Perdido...</h1>}

            <p>
              ¡{playerName}, has conseguido {scoreManager.score} puntos, en{' '}
              {scoreManager.time} segundos y {activeColumn} columnas!
            </p>
            <button className="finish-button" onClick={this.handleResetGame}>
              Jugar otra vez
            </button>

            <Records />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
