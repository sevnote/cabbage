var fibers = require("fibers");
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var http = require('http').Server(app);
var util = require('util');
config = require("./config/config.json")[app.get("env")];
console.log(app.get("env"));


// all environments
app.use(cors());
app.set('port', config.app_port);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser({
    limit: '100mb'
}));
app.use(express.urlencoded());
app.use(express.methodOverride());


app.all("*", function(req, res, next) {
    fibers(function() {
        next();
    }).run();
})

app.get("/", function(req, res, next) {
    res.json({
        RetCode: 10000,
        ErrorMessage: 'Fatal error'
    })
});

var methods_path = util.format("./methods/%s", (config.api_version));

fs.readdir(methods_path, function(err, methods) {
    for (var i in methods) {
        var method = methods[i].split(".").shift();
        var method = methods_path + '/' + method;
        app.use(require(method))
    }
});


http.listen(app.get('port'), function() {
    console.info("listening :" + app.get("port"));
})
