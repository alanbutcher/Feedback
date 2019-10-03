// @ts-ignore
const keys = require('../config/keys');
// @ts-ignore
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin'); //applied to certain routes api/stripe

// @ts-ignore
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // @ts-ignore
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    
    req.user.credits += 5; //passport finds user model, adds credits
    const user = await req.user.save(); //save user to DB

    res.send(user); //send updated user to whoever made request
    });
  }