const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/my-project')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);

var connectionString = 'mongodb://heroku_f747cr11:14rp572hmuaa3744nomj8ja5nt@ds121406.mlab.com:21406/heroku_f747cr11';

mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
require('./assignment/app')(app);
// Create HTTP server
const server = http.createServer(app);
server.listen( port, () => console.log('Running on port', app.get('port')));

//require('./assignment/app')(app);