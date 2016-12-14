/*=============================================================================
#     FileName: LoadCrontab.js
#         Desc: 
#       Author: Anakin Tu
#        Email: htu@sse.com.cn
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2016-12-14 13:24:39
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
    config = require("../../config/config.json")[app.get("env")];


var crontab = new crontab()
var request = new request()

app.post('/' + Method, function(req, res) {

    var eth0 = os.networkInterfaces().eth0[0]
    var ip = eth0.address
    var cron_list = []

    if ( req.body.owner == undefined ){
        var owner = 'root'
    }else{
        var owner = req.body.owner
    }

    var jobs = crontab.load();
    _.each(jobs, function(row) {
        var data = {
            'ip': ip,
            'isValid': row.isValid(),
            'schedule': util.format('%s %s %s %s %s', row.minute().toString(), row.hour().toString(), row.dom().toString(), row.month().toString(), row.dow().toString()),
            'render': row.render(),
            'minute': row.minute().toString(),
            'hour': row.hour().toString(),
            'dom': row.dom().toString(),
            'month': row.month().toString(),
            'dow': row.dow().toString(),
            'command': row.command(),
            'comment': row.comment(),
            'createTime':moment().format('X'),
            'updateTime':moment().format('X'),
            'owner':owner
        }
        cron_list.push(data)
    })

    var params = {
        'url': "http://localhost:7600/RecvData",
        "form": {
            'crontab': cron_list
        }
    }

    var result = request.post(params)

    return res.json(common.succeed(
        Method, 'Import Valid'
    ));


});
