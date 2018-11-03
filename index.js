const express = require('express');
const app = express();

// static file
app.use(express.static(__dirname+'/public'));

const route = require('./routes/route')(app,express);
