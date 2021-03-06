const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// db setup
mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//app setup

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);


//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port ', + port);

