var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');
const domain='http://www.biquge.com/';
router.get('/', function(req, res, next) {
    var bookId = req.query.bookId,
        index = req.query.index;
    if (bookId) {
        superagent.get(domain + bookId + '/' + index + '.html').end(function(err, response) {
            if (err) {
                res.redirect('/?bookId=' + bookId)
            } else {
                var $ = cheerio.load(response.text, {
                    decodeEntities: false
                });
                var title = $('h1').html();
                var content = $('#content').html().replace(/&nbsp;*/g, '').replace(/\/wｗW。ｑΒ⑸.CoM\\\\/g, '').replace(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig, '');
                var prev = $('.bottem1 a').eq(0).attr('href').split('.')[0];
                var next = $('.bottem1 a').eq(2).attr('href').split('.')[0];
                res.render('chapter', {
                    title: title,
                    content: content,
                    bookId: bookId,
                    index: index,
                    prev: prev,
                    next: next,
                });
            }
        });
    }
});
module.exports = router;
