const express = require('express');
// start express server
const app = express();
require('dotenv').config();

// colling startup files
require('./src/startup/prod')(app);
require('./src/startup/dbConfig')();
require('./src/startup/routes')(app);

// Setup server port
const port = process.env.PORT || 4000;

// listen for requests
app.listen(port, () => console.log(`INFO: SERVER LISTENING ON PORT ${port}`)); 