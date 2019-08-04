import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as settingsActions } from '../../reducers/settingsReducer';
import { actions as userActions } from '../../reducers/userReducer';
import { actions as gameActions } from '../../reducers/gameReducer';
import Records from '../Records';
import './dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRecords: false,
      filled: false,
      playerName: props.playerName,
    };
  }

  componentWillMount() {
    if (this.props.playerName !== 'Guest') {
      this.setState({ filled: true });
    }
    this.props.setPlayerName();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.playerName !== this.props.playerName) {
      this.setState({ filled: true });
    }
  }

  handleStartNewGame = () => {
    this.props.startGame();
  };

  handleShowRecords = () => {
    this.setState(({ showRecords }) => ({ showRecords: !showRecords }));
  };

  handleChange = (e) => {
    this.setState({ playerName: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.setPlayerName(this.state.playerName);
    this.setState({ filled: true });
  };

  handleSelectLevel = (e) => {
    this.props.setNewGameLevel(e.currentTarget.value);
  };

  render() {
    const { filled, showRecords } = this.state;
    const { playerName, level } = this.props;
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        {filled && (
          <div>
            <h3>Bienvenido {playerName}</h3>
            {level ? (
              <button
                className="new-game-button"
                onClick={this.handleStartNewGame}
              >
                Nueva Partida
              </button>
            ) : (
              <select onChange={this.handleSelectLevel}>
                <option value={null}>Elige un nivel</option>
                <option value={5}>5 - Fácil</option>
                <option value={6}>6 - Intermedio</option>
                <option value={7}>7 - Difícil</option>
                <option value={8}>8 - Olvídalo</option>
              </select>
            )}

            <hr />

            <button
              className="new-game-button"
              onClick={this.handleShowRecords}
            >
              Records
            </button>
            {showRecords && <Records />}
          </div>
        )}
        <div className="form">
          {!filled && (
            <form onSubmit={this.handleSubmit}>
              <label>Introduce tu nombre</label>
              <input type="text" onChange={this.handleChange} />
              <button type="submit">Enviar</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, settings, user }) => ({
  gameStarted: game.gameStarted,
  playerName: user.playerName,
  level: settings.level,
});

const mapDispatchToProps = {
  ...settingsActions,
  ...userActions,
  ...gameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
