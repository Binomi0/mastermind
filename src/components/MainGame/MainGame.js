import React, { Component, lazy, createRef, Suspense } from 'react';
import ReactNotification from 'react-notifications-component';

import TableroJuego from '../TableroJuego';
import Seleccionables from '../Seleccionables';
import Header from '../Header';
import Validations from '../Validations';
import { GameContext } from '../../context/game';
import * as validations from '../../utils/validations';
import { setKeyHandlers } from '../../utils/handlers';
import { setItemColors, setValidations } from '../../utils/helpers';
import './main-game.scss';

const GameFinish = lazy(() => import('../GameFinish'));

const initState = {
  notification: {
    message: 'El juego empieza tras el primer movimiento, ¡suerte!',
    title: 'Bienvenid@',
    type: 'info',
    duration: 4000,
  },
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
  itemColors: setItemColors(),
  validation: setValidations(),
};

export default class MainGame extends Component {
  constructor(props) {
    super(props);

    this.context = GameContext;
    this.selectedItemRef = createRef();
    this.notificationDOMRef = createRef();
  }

  componentWillMount() {
    this.setState({ ...initState, ...this.context }, this.setKeyHandlers);
  }

  componentDidMount() {
    console.log(setItemColors());
    this.addNotification();
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

    this.setState(
      {
        validation: {
          ...validation,
          [activeColumn]: match,
        },
        activeColumn: activeColumn + 1,
        movement: activeColumn * 4 + 1,
        turnFilled: false,
      },
      () => this.handleNewNotification(match.length, gameFinish.length),
    );
  };

  handleNewNotification = (colorsCount, positionCount) => {
    const notificationTitle = `${colorsCount === 0 ? '¡Ups!' : '¡Sigue así!'}`;
    const colorText = colorsCount === 1 ? 'color' : 'colores';
    const positionText = positionCount === 1 ? 'posición' : 'posiciones';
    const notificationMessage = `Has acertado ${colorsCount} ${colorText} y ${positionCount}
    ${positionText}`;

    this.setState(
      {
        notification: {
          ...this.state.notification,
          title: notificationTitle,
          message: notificationMessage,
          type: 'info',
          duration: 2000,
        },
      },
      this.addNotification,
    );
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
    console.log(item);
    if (column === this.state.activeColumn) {
      this.setState({ movement: item });
    }
  };

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: this.state.notification.title,
      message: this.state.notification.message,
      type: this.state.notification.type,
      insert: 'bottom',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: this.state.notification.duration },
      dismissable: { click: true, touch: true },
    });
  }

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
              <ReactNotification
                ref={this.notificationDOMRef}
                onNotificationRemoval={() => console.log('OJET')}
              />
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
