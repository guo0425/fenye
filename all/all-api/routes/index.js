var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getdata', function(req, res, next) {
    const { name, skip, limit } = req.query;
    console.log(skip, limit)
    mongo.find('H5', 'cook', { name: new RegExp(name) }, function(result) {
        var total = Math.ceil(result.length / limit);
        mongo.find('H5', 'cook', { name: new RegExp(name) }, function(rs) {
            if (!rs) {
                res.send({ code: 1, msg: "error" })
            } else {
                res.send({ code: 1, data: rs, total: total })
            }
        }, {
            skip: skip - 1,
            limit: limit,
        })

    })
})
module.exports = router;