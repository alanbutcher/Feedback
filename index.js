'use strict';

// import HapiPassport from 'passport-hapi-oauth';
const Hapi = require('@hapi/hapi');
const passport = require('passport'); //possibly remove
const GoogleStrategy = require('passport-google-oauth20').Strategy; //possibly remove
const keys = require('./config/keys');

const init = async () => {
  
  const port = process.env.PORT || 5000;
  
  const server = Hapi.server({
    port: port
  });



  passport.use(
    new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'auth/google/callback'
    },
      accessToken => {
        console.log(accessToken);
      }
    )
  );  
  
  server.route({
    method: 'GET',
    path: '/auth/google',
    handler: (request, reply) => {
      (passport.authenticate('google', {
        scope: ['profile', 'email']
      })
      )
    }

  
  await server.start();
  console.log('Server running on %s', server.info.uri);


process.on('unhandledRejection', (err) => {
  
  console.log(err);
  process.exit(1);
});

init();