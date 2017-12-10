import React from 'react';

class Fish extends React.Component {
  render() {
    return (
      <li className="menu-fish">

        {this.props.details.name}
      </li>
    )
  }
}

export default Fish;
