import React, { Component } from 'react';
import Confetti from 'react-dom-confetti';
import { connect } from 'react-redux';
import db from '../../config/firebase';
import Records from '../Records';
import { actions } from '../../reducers/gameReducer';
import { resetLevel } from '../../reducers/settingsReducer';
import './gameFinish.scss';

const confettiConfig = {
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

class GameFinish extends Component {
  state = {
    confettiStatus: null,
  };

  componentDidMount() {
    const { points, playerName, timeElapsed } = this.props;
    const scoreRef = db.ref(`score/${playerName}`);
    const newScore = {
      score: points,
      player: playerName,
      time: timeElapsed,
    };

    scoreRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        if (snapshot.val().score < points) {
          alert('has superado tu record');
          scoreRef.set(newScore, () => {
            this.setState({ confettiStatus: true });
          });
        }
      } else {
        scoreRef.set(newScore, () => {
          this.setState({ confettiStatus: true });
        });
      }
    });
  }

  handleResetGame = () => {
    this.props.resetGame();
    this.props.setGameFinished();
    this.props.resetLevel();
  };

  render() {
    const { confettiStatus } = this.state;
    const {
      points,
      activeColumn,
      timeElapsed,
      gameWin,
      gameLost,
      playerName,
    } = this.props;

    const winMessage = `Has conseguido ${points} puntos, en ${timeElapsed} segundos y ${activeColumn} columnas!`;
    const lostMessage = `Creo que deberías practicar un poco más...`;
    return (
      <section>
        <div className="game-finish">
          <Confetti active={confettiStatus} config={confettiConfig} />

          {gameWin && <h1>¡Has Ganado {playerName}!</h1>}
          {gameLost && <h1>{playerName}, has perdido...</h1>}

          <p>{gameWin && winMessage}</p>
          <p>{gameLost && lostMessage}</p>

          <button className="finish-button" onClick={this.handleResetGame}>
            Jugar otra vez
          </button>

          <Records />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ settings, game, score, user }) => ({
  points: score.points,
  activeColumn: game.activeColumn,
  playerName: user.playerName,
  gameWin: game.gameWin,
  gameLost: game.gameLost,
  timeElapsed: game.timeElapsed,
  level: settings.level,
});

export default connect(
  mapStateToProps,
  { ...actions, resetLevel },
)(GameFinish);
