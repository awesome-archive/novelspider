var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
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
module.exports = router;
