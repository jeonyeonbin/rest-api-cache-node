const express = require('express');
const app = express();

// static file
app.use(express.static(__dirname+'/public'));
console.log(process.env.NODE_ENV);
const route = require('./routes/route')(app,express);
