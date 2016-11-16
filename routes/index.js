var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        title: '搜索',
        subtitle: '拒绝广告<small>请搜索您想看的小说</small>',
        content: '请搜索'
    })
});
module.exports = router;
