var express = require('express'),
    app = module.exports = express(),
    fibers = require('fibers'),
    path = require('path'),
    common = require('../../lib/common'),
    moment = require('moment'),
    Method = path.basename(__filename, '.js'),
    _ = require('underscore'),
    mysql = require('../../lib/mysql'),
    util = require('util'),
    config = require("../../config/config.json")[app.get("env")],
    db = new mysql(config.mysql);

app.use('/' + Method, function(req, res) {
   
    console.log(req.query)
    var limit = req.query['results']
    var page = req.query['page']
    
    if (page == undefined || page === '1') {
        offset = '0'
    }else{
        offset = limit*page
    }

    var sql = util.format("SELECT * FROM cabbage.crontab  ORDER BY updateTime desc LIMIT  %s,%s",offset,limit)
    console.log(sql)
    var result = db.query(sql)
    var total = db.query("SELECT count(*) as count FROM cabbage.crontab")

    res.json(common.succeed(
        Method, {
            Data:result ,
            Page:offset,
            Total:total[0].count
        }
    ));
});
