var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var superagent = require('superagent');
var cheerio = require('cheerio');

var domain = 'http://www.biquge.com/';
var items = [];

router.get('/search', function(req, res, next) {
    res.render('search', {
        title: '搜索',
        subtitle: '拒绝广告<small>请搜索您想看的小说</small>',
        content: '请搜索'
    })
});

router.get('/searchResult', function(req, res, next) {
    var getUrl = encodeURI('http://zhannei.baidu.com/cse/search?q=' + req.query.search + '&s=287293036948159515&srt=def&nsid=0');
    superagent.get(getUrl).end(function(err, response) {
        if (err) {
            res.send('Ops!找不到页面！')
        } else {
            var $ = cheerio.load(response.text, {
                decodeEntities: false
            });
            var isExist = $('#results').find('.nors').length;
            var content, detail;
            if (isExist) {
                content = '抱歉！没有搜到<span>' + req.query.search + '</span>';
            } else {
                content = [];
                var resultItem = $('#results').find('.result-item');
                resultItem.each(function(index, el) {
                    var thisTit = $(this).find('.result-game-item-title-link').html();
                    var thisUrl = $(this).find('.result-game-item-title-link').attr('href').match(/\d+\D\d+/);
                    var thisAuthor = $(this).find('')
                    var thisDetail = $(this).find('.result-game-item-info').html();
                    content.push({
                        thisTit: thisTit,
                        thisUrl: thisUrl,
                        thisDetail: thisDetail
                    })
                });
            }
            res.render('searchResult', {
                isExist: isExist,
                title: '搜索结果',
                content: content,
                search: req.query.search
            })
        }
    })
});

router.get('/', function(req, res, next) {
    superagent.get(domain + req.query.bookId).end(function(err, response) {
        if (err) {
            res.redirect('/search')
        } else {
            var $ = cheerio.load(response.text, {
                decodeEntities: false
            });
            var title = $('h1').html();
            var author = $('h1').next('p').html().replace(/&nbsp;*/g, '');
            var content = $('#list').html();
            // $('#list a').each(function(index) {
            //     var chapter = $(this).html();
            //     var chapter_url = $(this).attr('href').match(/\d{7,12}/);
            //     items.push({
            //         chapter: chapter,
            //         chapter_url: chapter_url
            //     })
            // });
            res.render('index', {
                title: title,
                author: author,
                content: content,
                bookId: req.query.bookId,
            });
        }
    });
});


router.get('/chapter', function(req, res, next) {
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
                var category = domain + bookId;
                res.render('chapter', {
                    title: title,
                    content: content,
                    bookId: bookId,
                    index: index,
                    prev: prev,
                    next: next,
                    category: category
                });
            }
        });
    }
});

module.exports = router;