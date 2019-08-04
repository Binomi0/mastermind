import React from 'react';
import { connect } from 'react-redux';
import './header.scss';

const Header = ({ timeElapsed }) => {
  const [blink, setBlink] = React.useState('');

  React.useEffect(() => {
    if (timeElapsed === 1) {
      setBlink('blink');
    }
  }, [blink, timeElapsed]);

  return (
    <div className="header">
      <h2>MasterMind Game</h2>
      {timeElapsed !== 0 && (
        <h3>
          Trasncurrido: <span className={blink}>{timeElapsed}</span> segundos
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = ({ game }) => ({ timeElapsed: game.timeElapsed });

export default connect(mapStateToProps)(Header);
