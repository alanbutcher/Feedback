import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) { //this.props.auth contains new user model from ap
      case null: //error
        return;
      case false: //user not logged in
        return <li><a href="/auth/google">Login With Google</a></li>;
      default: //user is logged in
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin:' 0 10px' }}>
            Credits: {this.props.auth.credits}  
          </li>,
          <li key="2"><a href="api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo" 
          >
            FeedBack</Link>
          <ul className="right">
            {this.renderContent()}
            {/* <li><a className="waves-effect waves-light btn">Login With Google</a></li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);