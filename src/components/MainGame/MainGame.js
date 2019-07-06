import React, { Component, lazy, createRef, Suspense } from 'react';

import TableroJuego from '../TableroJuego/TableroJuego';
import Seleccionables from '../Seleccionables/Seleccionables';
import Header from '../Header/Header';
import Validations from '../Validations/Validations';
import { GameContext } from '../../context/game';
import * as validations from '../../utils/validations';
import { setKeyHandlers } from '../../utils/handlers';
import './main-game.scss';
import ScoreManager from '../../utils/ScoreManager';

const GameFinish = lazy(() => import('../GameFinish/GameFinish'));

const initState = {
  selectedColor: 'white',
  movement: 1,
  activeColumn: 1,
  gameWin: false,
  gameLost: false,
  turnFilled: false,
  itemColors: {
    1: {
      1: '',
      2: '',
      3: '',
      4: '',
    },
    2: {
      5: '',
      6: '',
      7: '',
      8: '',
    },
    3: {
      9: '',
      10: '',
      11: '',
      12: '',
    },
    4: {
      13: '',
      14: '',
      15: '',
      16: '',
    },
    5: {
      17: '',
      18: '',
      19: '',
      20: '',
    },
    6: {
      21: '',
      22: '',
      23: '',
      24: '',
    },
    7: {
      25: '',
      26: '',
      27: '',
      28: '',
    },
    8: {
      29: '',
      30: '',
      31: '',
      32: '',
    },
    9: {
      33: '',
      34: '',
      35: '',
      36: '',
    },
    10: {
      37: '',
      38: '',
      39: '',
      40: '',
    },
  },
  validation: {
    1: [0, 0, 0, 0],
    2: [0, 0, 0, 0],
    3: [0, 0, 0, 0],
    4: [0, 0, 0, 0],
    5: [0, 0, 0, 0],
    6: [0, 0, 0, 0],
    7: [0, 0, 0, 0],
    8: [0, 0, 0, 0],
    9: [0, 0, 0, 0],
    10: [0, 0, 0, 0],
  },
};

export default class MainGame extends Component {
  constructor(props) {
    super(props);

    this.scoreManager = new ScoreManager(0);
    this.state = { game: props.game };
    this.selectedItemRef = createRef();
  }

  componentWillMount() {
    setKeyHandlers(() => {
      if (this.state.turnFilled) {
        this.handleValidate(this.state.activeColumn);
      }
    });
    this.setState({ ...initState, ...this.context });
  }

  handleSetColor = (color) => {
    const { activeColumn, movement, turn, itemColors } = this.state;

    if (movement / activeColumn > 4) {
      return;
    }

    this.setState(
      {
        selectedColor: color,
        itemColors: {
          ...itemColors,
          [activeColumn]: {
            ...itemColors[activeColumn],
            [movement]: color,
          },
        },
        turn,
        movement: movement + 1,
      },
      this.handleTurn,
    );
  };

  handleTurn = () => {
    const { activeColumn, itemColors } = this.state;
    const turn = Object.values(itemColors[activeColumn]);
    const isRowFilled = validations.isRowFilled(turn);
    if (!isRowFilled) {
      this.setState({ turnFilled: false });
    } else {
      this.setState({ turnFilled: true });
    }
  };

  handleValidate = () => {
    const { result, activeColumn, itemColors, validation } = this.state;

    const turn = Object.values(itemColors[activeColumn]);
    const isRowFilled = validations.isRowFilled(turn);

    // Any of the items are not colured
    if (!isRowFilled) {
      console.log('At least one item is not coloured.');
      return;
    }

    const match = validations.getMatch(turn, result);

    // Fills `gameFinish` list with matched results identified with number 2
    const gameFinish = match.filter((item) => item === 2);

    // 4 items are equal to 2 so player wins
    if (gameFinish.length === 4) {
      console.log('Game Over! Player Wins! => gameFinish.length === 4');
      this.scoreManager.setScore(500);
      this.setState({ gameWin: true });
      return;
    }

    // Last column was filled so game over
    if (activeColumn === 9) {
      console.log('activeColumn === 9');
      this.setState({ gameLost: true });
      return;
    }

    const newScore = validations.setGameScore(
      match,
      activeColumn,
      this.scoreManager.getScore(),
    );

    this.scoreManager.setScore(newScore);

    // console.log('this.scoreManager', this.scoreManager);

    this.setState({
      validation: {
        ...validation,
        [activeColumn]: match,
      },
      activeColumn: this.state.activeColumn + 1,
      turnFilled: false,
    });
  };

  resetGame = () => {
    this.state.resetGame();
    this.setState(initState);
    // this.setState({ ...initState, result: this.context.result });
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((item) => {
      localStorage.removeItem(`item-${item}`);
    });
  };

  render() {
    const { gameWin, gameLost } = this.state;

    const context = {
      ...this.state,
      scoreManager: this.scoreManager,
      handleValidate: this.handleValidate,
      handleSetColor: this.handleSetColor,
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
