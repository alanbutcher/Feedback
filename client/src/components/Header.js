import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="left brand-logo">FeedBack</div>
          <ul className="right">
            <li><a className="waves-effect waves-light btn">Login With Google</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;