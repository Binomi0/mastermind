import React, { Component } from 'react';

import Validation from '../Validation/Validation';
import './validations.css';

export default class Validations extends Component {
  handleClick = () => {
    const { validate, columnActive } = this.props;

    validate(columnActive);
  };

  render() {
    const { validItems, columnActive } = this.props;
    return (
      <div className="tablero-juego validations">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
          <Validation
            key={column}
            validItems={validItems[column]}
            active={columnActive === column}
            onClick={this.handleClick}
          />
        ))}
      </div>
    );
  }
}
