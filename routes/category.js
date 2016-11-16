var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');

const domain='http://www.biquge.com/';
router.get('/', function(req, res) {
    superagent.get(domain + req.query.bookId).end(function(err, response) {
        if (err) {
            console.log(111)
            res.redirect('/search')
        } else {
            var $ = cheerio.load(response.text, {
                decodeEntities: false
            });
            var title = $('h1').html();
            var author = $('h1').next('p').html().replace(/&nbsp;*/g, '');
            var content = $('#list').html();
            res.render('category', {
                title: title,
                author: author,
                content: content,
                bookId: req.query.bookId,
            });
        }
    });
});

module.exports = router;