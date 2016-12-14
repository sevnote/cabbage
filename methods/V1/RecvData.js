var express = require('express'),
    app = module.exports = express(),
    path = require('path'),
    common = require('../../lib/common'),
    _ = require('underscore'),
    moment = require('moment'),
    util = require('util'),
    Method = path.basename(__filename, '.js'),
    mysql = require('../../lib/mysql'),
    config = require("../../config/config.json")[app.get("env")],
    db = new mysql(config.mysql);

app.post('/' + Method, function(req, res) {

    var result = db.insert_ignore('crontab', req.body.crontab)

    if (result) {
        return res.json(common.succeed(
            Method, 'Succeed'
        ));
    } else {
        return res.json(common.failed('-1', Method, 'Failed'))

    }
});
