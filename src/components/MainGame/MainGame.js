import React, { Component, lazy, createRef, Suspense } from 'react';

import './main-game.scss';
import TableroJuego from '../TableroJuego/TableroJuego';
import Seleccionables from '../Seleccionables/Seleccionables';
import Header from '../Header/Header';
import Validations from '../Validations/Validations';
import { GameContext } from '../../context/game';
import * as validations from '../../utils/validations';
import { setKeyHandlers } from '../../utils/handlers';

const GameFinish = lazy(() => import('../GameFinish/GameFinish'));

const initState = {
  selectedColor: 'white',
  result: [],
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
export default class MainGame extends Component {
  constructor() {
    super();

    this.selectedItemRef = createRef();
  }

  componentWillMount() {
    setKeyHandlers(() => {
      if (this.state.turnFilled) {
        this.handleValidate(this.context.activeColumn);
        console.log('has presionado enter');
      } else {
        console.log('ojet');
      }
    });
    this.setState({ ...this.context, turnFilled: false });
  }

  changeColor = (selectedColor) => {
    this.setState({ selectedColor });
  };

  resetGame = () => {
    this.context.resetGame();
    this.setState(initState);
    // this.setState({ ...initState, result: this.context.result });
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((item) => {
      localStorage.removeItem(`item-${item}`);
    });
  };

  handleValidate = (column) => {
    const { turn, result, activeColumn, score } = this.state;
    const match = validations.getMatch(turn, result);

    // Fills `gameFinish` list with matched results identified with number 2
    const gameFinish = match.filter((item) => item === 2);

    // Any of the items are not colured
    if (turn.includes(0)) {
      console.log('turn.includes(0)');
      return;
    }

    // 4 items are equal to 2 so player wins
    if (gameFinish.length === 4) {
      console.log('gameFinish.length === 4');
      this.setState({ gameWin: true, score: score + 500 });
      return;
    }

    // Last column was filled so game over
    if (column === 9) {
      console.log('column === 9');
      this.setState({ gameLost: true });
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
            activeColumn,
            score,
          );

          this.setState({
            activeColumn: this.state.activeColumn + 1,
            turn: [0, 0, 0, 0],
            score: newScore,
            turnFilled: false,
          });
        }
      },
    );
  };

  setTurn = (item, column) => {
    console.log('column', column);
    // item.removeClass('active');
    const { turn, selectedColor } = this.state;

    turn[item] = selectedColor;

    this.setState({ turn }, () => {
      if (!turn.includes(0)) {
        this.setState({ turnFilled: true });
      } else {
        this.setState({ turnFilled: false });
      }
    });
  };

  render() {
    const { gameWin, gameLost } = this.state;

    const context = {
      ...this.state,
      setTurn: this.setTurn,
      handleValidate: this.handleValidate,
      changeColor: this.changeColor,
      resetGame: this.resetGame,
      selectedItemRef: this.selectedItemRef,
    };

    return (
      <GameContext.Provider value={context}>
        <div className="tablero">
          {gameWin || gameLost ? (
            <Suspense fallback={<div />}>
              <GameFinish />
            </Suspense>
          ) : (
            <>
              <Header />
              <Seleccionables />
              <Validations />
              <TableroJuego />
            </>
          )}
        </div>
      </GameContext.Provider>
    );
  }
}

MainGame.contextType = GameContext;
