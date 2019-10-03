import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="FeedBack"
        description="$5 for 5 email credits"  
        amount={500} //in US cents
        token={token => this.props.handleToken(token)} //expecting callback once Stripe sends token back
        stripeKey={process.env.REACT_APP_STRIPE_KEY} //api key 
      >
        <button className="btn">Add Credits</button>  
      </StripeCheckout>  
    );
  }
}

export default connect(null, actions) (Payments);
