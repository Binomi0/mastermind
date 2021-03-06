import React, { PureComponent } from 'react';

import './validation.scss';

export default class Validation extends PureComponent {
  render() {
    const { validItems } = this.props;
    // console.log('validItems', validItems);
    return (
      <div className="validation-group">
        <div className="validation-column">
          {[0, 1].map((item) => (
            <div
              key={item}
              className={`validation-item item-${validItems[item]}`}
            />
          ))}
        </div>
        <div className="validation-column">
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
