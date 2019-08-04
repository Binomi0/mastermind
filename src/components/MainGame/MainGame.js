import React, { Component, lazy, createRef, Suspense } from 'react';
import { connect } from 'react-redux';
import TableroJuego from '../TableroJuego';
import Seleccionables from '../Seleccionables';
import Header from '../Header';
import Validations from '../Validations';
import {
  setKeyListeners,
  isValidKey,
  isEnterKeyPressed,
} from '../../utils/handlers';
import './main-game.scss';
import { actions } from '../../reducers/gameReducer';

const GameFinish = lazy(() => import('../GameFinish'));

class MainGame extends Component {
  constructor(props) {
    super(props);

    this.selectedItemRef = createRef();
    this.state = { hasError: false };
  }

  componentWillMount() {
    const { availableColors } = this.props.game;

    setKeyListeners((key) => {
      if (isValidKey(key, availableColors.length)) {
        if (/[1-8]/.test(key)) {
          this.handleSetMovement(availableColors[Number(key) - 1]);
        }
        if (isEnterKeyPressed(key)) {
          this.handleValidate();
        }
      }
    });
  }

  componentDidCatch(error) {
    console.log('He capturado un error', error);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  setGameTimer = () => {
    let timer = 0;
    if (!this.gameTimer) {
      this.gameTimer = setInterval(() => {
        timer += 1;
        this.props.updateTimer(timer);
      }, 1000);
    }
  };

  handleSetMovement = (color) => {
    if (this.props.game.timeElapsed === 0) {
      this.setGameTimer();
    }
    const { activeColumn, movement, itemColors } = this.props.game;

    this.props.handleSetMovement({ color, activeColumn, movement, itemColors });
  };

  handleTurn = () => {
    this.props.handleTurn();
  };

  handleValidate = () => {
    this.props.handleValidate(() => {
      clearInterval(this.gameTimer);
    });
  };

  handleResetGame = () => {
    this.props.resetGame();
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((item) => {
      localStorage.removeItem(`item-${item}`);
    });
    clearInterval(this.gameTimer);
  };

  setUserSelectedMovement = (item, column) => {
    if (column === this.props.activeColumn) {
      this.props.setUserSelectedMovement(item);
    }
  };

  render() {
    const {
      game: { gameWin, gameLost },
    } = this.props;
    const { hasError } = this.state;

    return (
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
        {hasError && <h1>Mierda un ojet!</h1>}
      </div>
    );
  }
}

const mapStateToProps = ({ game, score }) => ({ game, score });

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainGame);
