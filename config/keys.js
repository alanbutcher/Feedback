//keys.js - figure out what set of creds to return

if (process.env.NODE_ENV === 'production') {
  //in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // in dev - return dev set of keys
  module.exports = require('./dev');
}




//production db
// mongodb://alanb:password1234@ds031883.mlab.com:31883/feedbackapp-prod

//package.json
//scripts
    // "server": "nodemon index.js",
    // "client": "cd client && yarn run start",
    // concurrently\ "yarn run server\" \"yarn run client\" 