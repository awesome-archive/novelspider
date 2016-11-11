var express = require('express');
var path = require('path');
var fs = require('fs');
var superagent = require('superagent');
var cheerio = require('cheerio');
var charset = require('superagent-charset');
var routes = require('./routes/index');
var users = require('./routes/chapter');
var search = require('./routes/search');
var searchResult = require('./routes/searchResult');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use('',routes);
app.listen(8089,function(){
    console.log('listening 8089')
})