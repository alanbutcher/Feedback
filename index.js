const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);




const PORT = process.env.PORT || 3000;
app.listen(PORT);

// https://infinite-caverns-55145.herokuapp.com/
