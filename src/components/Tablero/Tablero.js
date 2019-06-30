import React, { Component } from 'react';

import './tablero.css';
import TableroJuego from '../TableroJuego/TableroJuego';
import Seleccionables from '../Seleccionables/Seleccionables';
import Header from '../Header/Header';
import GameFinish from '../GameFinish/GameFinish';
import Validations from '../Validations/Validations';
import { colors } from '../../utils/constants';
import { GameContext } from '../../context/game';
import * as validations from '../../utils/validations';

const initState = {
  selectedColor: 'white',
  columnActive: 0,
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
export default class Tablero extends Component {
  static contextType = GameContext;

  state = { ...initState, result: this.context.result };

  changeColor = (selectedColor) => {
    this.setState({ selectedColor });
  };

  resetGame = () => {
    console.log('this.context', this.context);
    this.setState({ ...initState, result: this.context.result });
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((item) => {
      localStorage.removeItem(`item-${item}`);
    });
  };

  handleValidate = (column) => {
    const { turn, result, columnActive, score } = this.state;
    const match = validations.getMatch(turn, result);
    const gameFinish = match.filter((item) => item === 2);

    if (turn.includes(0)) {
      return;
    }

    if (gameFinish.length === 4) {
      this.setState({ gameWin: true, score: score + 500 });
      return;
    }

    if (column === 9) {
      this.setState({ gameLost: true });
      return;
    }

    if (gameFinish.length === 4) {
      this.setState({ gameWin: true });
      return;
    }

    this.setState(
      {
        validation: {
          ...this.state.validation,
          [column]: match,
        },
      },
      async () => {
        const isRowFilled = validations.isRowFilled(turn);
        if (isRowFilled) {
          const newScore = await validations.setGameScore(
            match,
            columnActive,
            score,
          );

          console.log('turn', turn);
          console.log('result', result);

          this.setState({
            columnActive: this.state.columnActive + 1,
            turn: [0, 0, 0, 0],
            score: newScore,
          });
        }
      },
    );
  };

  selectColor = (color, item) => {
    const turn = this.state.turn;
    turn[item] = color;
    this.setState({ turn });
  };

  render() {
    const { gameWin, validation, columnActive, score, gameLost } = this.state;
    return (
      <GameContext.Provider value={[0, 0, 0, 0]}>
        <div className="tablero">
          {gameWin || gameLost ? (
            <GameFinish score={score} resetGame={this.resetGame} />
          ) : (
            <div>
              <Header score={score} selectedColor={this.state.selectedColor} />

              <Validations
                columnActive={columnActive}
                validItems={validation}
                validate={this.handleValidate}
              />

              <TableroJuego
                selectColor={this.selectColor}
                active={columnActive}
                selectedColor={this.state.selectedColor}
              />
              <Seleccionables
                colors={Object.values(colors)}
                changeColor={this.changeColor}
              />
            </div>
          )}
        </div>
      </GameContext.Provider>
    );
  }
}
