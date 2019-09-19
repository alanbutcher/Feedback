'use strict';

const Hapi = require('@hapi/hapi');
const passport = require('passport'); //possibly remove
const GoogleStrategy = require('passport-google-oauth20').Strategy; //possibly remove
const keys = require('./config/keys');

const init = async () => {
  
  const port = process.env.PORT || 5000;
  
  const server = Hapi.server({
    port: port
    // host: 'localhost'
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
  
  
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  
  console.log(err);
  process.exit(1);
});

init();

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, h) => {
  
  //     return 'Bye Buddy!';
  //   }
  // });