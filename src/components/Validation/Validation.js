import React, { PureComponent } from 'react';

import './validation.css';

export default class Validation extends PureComponent {
  render() {
    const { validItems, onClick, active } = this.props;
    return (
      <div
        className={`validation-group${active ? '-hover' : ''}`}
        onClick={onClick}
      >
        <div className="columna">
          {[0, 1].map((item) => (
            <div
              key={item}
              className={`validation-item item-${validItems[item]}`}
            />
          ))}
        </div>
        <div className="columna">
          {[2, 3].map((item) => (
            <div
              key={item}
              className={`validation-item item-${validItems[item]}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
