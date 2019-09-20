const express = require('express');
const app = express();
// const passport = require('passport'); //possibly remove
// const GoogleStrategy = require('passport-google-oauth20').Strategy; //possibly remove
// const keys = require('./config/keys');



app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(POR);

// https://infinite-caverns-55145.herokuapp.com/
