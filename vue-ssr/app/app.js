const express = require('express')
const opn = require('opn')
const path = require('path')
let app = express();

// app.use(express.static('app'));
// app.set('view engine', 'html')
app.use('/', require('./router/index'))

module.exports = app
