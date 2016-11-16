var express = require('express');
var superagent = require('superagent');
var path = require('path');
var cheerio = require('cheerio');
var index = require('./routes/index');
var chapter = require('./routes/chapter');
var category = require('./routes/category');
var searchResult = require('./routes/searchResult');


var app = express();
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use('',index)
app.use('/index', index);
app.use('/chapter', chapter);
app.use('/category', category);
app.use('/searchResult', searchResult);

app.listen(3000, function() {
	console.log('listening 8089')
})