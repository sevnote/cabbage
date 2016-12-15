var express = require('express'),
    app = module.exports = express(),
    path = require('path'),
    common = require('../../lib/common'),
    _ = require('underscore'),
    moment = require('moment'),
    util = require('util'),
    Method = path.basename(__filename, '.js'),
    request = require('../../lib/request'),
    mysql = require('../../lib/mysql'),
    config = require("../../config/config.json")[app.get("env")],
    agent_port = (config.agent_port),
    db = new mysql(config.mysql),
    request = new request();

app.post('/' + Method, function(req, res) {

    var ip = req.body.ip
    var params = {
        url: util.format("http://%s:%s/SaveCrontab", ip, agent_port),
        form: {
            cmd: req.body.cmd,
            schedule: util.format('%s %s %s %s %s', req.body.minutes, req.body.hour, req.body.dom, req.body.month, req.body.dow),
            comment: req.body.comment
        }
    }

    var result = request.post(params)
    var result = JSON.parse(result)

    if (result.RetCode === 0) {
        var owner = 'root' 
        var params = {
            url: util.format("http://%s:%s/LoadCrontab", ip, agent_port),
            form: {
                owner: owner
            }
        }
        var result = request.post(params)
        return res.json(common.succeed(
            Method, 'Succeed'
        ));
    } else {
        return res.json(common.failed('-1', Method, 'Failed'))
    }

});
