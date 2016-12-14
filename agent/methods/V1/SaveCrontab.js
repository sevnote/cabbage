/*=============================================================================
#     FileName: SaveCrontab.js
#         Desc: 
#       Author: Anakin Tu
#        Email: htu@sse.com.cn
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2016-12-14 15:51:12
#      History:
=============================================================================*/
var express = require('express'),
    app = module.exports = express(),
    path = require('path'),
    common = require('../../lib/common'),
    _ = require('underscore'),
    moment = require('moment'),
    util = require('util'),
    Method = path.basename(__filename, '.js'),
    crontab = require('../../lib/crontab'),
    request = require('../../lib/request'),
    os = require('os'),
    _ = require('underscore'),
    util = require('util'),
    config = require("../../config/config.json")[app.get("env")],
    crontab = new crontab(),
    request = new request();

app.post('/' + Method, function(req, res) {

    var eth0 = os.networkInterfaces().eth0[0]
    var ip = eth0.address

    if (req.body.owner == undefined) {
        var owner = 'root'
    } else {
        var owner = req.body.owner
    }


    var cmd = req.body.cmd;
    var schedule = req.body.schedule
    var comment = req.body.comment;

    var job = crontab.create(cmd,schedule,comment);

    var result = _.last(job.jobs()).render()
    return res.json(common.succeed(
        Method, {result:result}
    ));


});
