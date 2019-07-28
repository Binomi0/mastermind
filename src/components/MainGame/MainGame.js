import React, { Component, lazy, createRef, Suspense } from 'react';

import TableroJuego from '../TableroJuego';
import Seleccionables from '../Seleccionables';
import Header from '../Header';
import Validations from '../Validations';
import { GameContext } from '../../context/game';
import * as validations from '../../utils/validations';
import { setKeyHandlers } from '../../utils/handlers';
import './main-game.scss';
// import ScoreManager from '../../utils/ScoreManager';

const GameFinish = lazy(() => import('../GameFinish/GameFinish'));

const initState = {
  selectedColor: 'white',
  scoreManager: {
    score: 0,
    player: '',
    time: 0,
  },
  movement: 1,
  timeElapsed: 0,
  bonus: 1000,
  activeColumn: 1,
  gameStarted: false,
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

    this.context = GameContext;
    this.selectedItemRef = createRef();
  }

  componentWillMount() {
    this.setState({ ...initState, ...this.context }, this.setKeyHandlers);
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
  }

  setKeyHandlers = () => {
    const { availableColors } = this.context;
    const { activeColumn } = this.state;

    setKeyHandlers((key) => {
      if (Number(key) <= availableColors.length || key === 'Enter') {
        if (key === 'Enter') {
          this.handleValidate(activeColumn);
        }
        if (/[1-8]/.test(key)) {
          this.handleSetColor(availableColors[Number(key) - 1]);
        }
      }
    });
  };

  setGameTimer = () => {
    let timer = 0;
    this.gameTimer = setInterval(() => {
      timer += 1;
      if (this.state.bonus > 0) {
        const penalization = 20;
        this.setState({
          bonus: this.state.bonus - penalization,
          timeElapsed: timer,
        });
      }
    }, 1000);
  };

  handleSetColor = (color) => {
    const { activeColumn, movement, itemColors, gameStarted } = this.state;

    if (!gameStarted) {
      this.setState({ gameStarted: true }, this.setGameTimer);
    }

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
    const {
      result,
      activeColumn,
      itemColors,
      validation,
      bonus,
      timeElapsed,
      availableColors,
    } = this.state;

    const turn = Object.values(itemColors[activeColumn]);

    // Any of the items are not colured
    if (!validations.isRowFilled(turn)) {
      return;
    }

    const match = validations.getMatch(turn, result);

    // Fills `gameFinish` list with matched results identified with number 2
    const gameFinish = match.filter((item) => item === 2);

    // 4 items are equal to 2 so player wins
    if (gameFinish.length === 4) {
      const newScore = validations.setGameScore(
        gameFinish,
        activeColumn,
        timeElapsed,
        availableColors.length,
      );
      this.setState({
        gameWin: true,
        scoreManager: {
          score: newScore + bonus,
          player: this.context.playerName,
          time: timeElapsed,
        },
      });
      clearInterval(this.gameTimer);
      return;
    }

    // Last column was filled so game over
    if (activeColumn === 10) {
      const newScore = validations.setGameScore(
        match,
        activeColumn,
        timeElapsed,
        availableColors.length,
      );

      this.setState({
        gameLost: true,
        scoreManager: {
          score: newScore,
          player: this.context.playerName,
          time: timeElapsed,
        },
      });
      clearInterval(this.gameTimer);
      return;
    }

    this.setState({
      validation: {
        ...validation,
        [activeColumn]: match,
      },
      activeColumn: activeColumn + 1,
      movement: activeColumn * 4 + 1,
      turnFilled: false,
    });
  };

  handleResetGame = (level) => {
    this.state.resetGame(level);
    this.setState(initState);
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((item) => {
      localStorage.removeItem(`item-${item}`);
    });
    clearInterval(this.gameTimer);
  };

  setUserSelectedMovement = (item, column) => {
    if (column === this.state.activeColumn) {
      this.setState({ movement: item });
    }
  };

  render() {
    const { gameWin, gameLost } = this.state;

    const context = {
      ...this.state,
      setGameStarted: this.props.setGameStarted,
      handleValidate: this.handleValidate,
      handleSetColor: this.handleSetColor,
      handleResetGame: this.handleResetGame,
      selectedItemRef: this.selectedItemRef,
      setUserSelectedMovement: this.setUserSelectedMovement,
    };

    return (
      <GameContext.Provider value={context}>
        <div className="tablero">
          {gameWin || gameLost ? (
            <Suspense fallback={<div />}>
              {gameWin && <GameFinish status />}
              {gameLost && <GameFinish status />}
            </Suspense>
          ) : (
            <>
              <Header />
              <div className="game-container">
                <Validations />
                <TableroJuego />
              </div>
              <Seleccionables />
              <p>
                Puedes usar los números (1,2,3...) para seleccionar un color y
                (Enter) para validar la jugada.
              </p>
            </>
          )}
        </div>
      </GameContext.Provider>
    );
  }
}

MainGame.contextType = GameContext;
