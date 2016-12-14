var Future = require('fibers/future');
var request = require('request');

var request_base = function() {

    var header = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36',
        'Content_Type': 'application/json'
    }

    this.get = function(params) {
        var f = new Future;
        request({
            uri: params.url,
            method: 'GET',
            header: header,
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                f.
                return (body)
            }
        });
        return f.wait();
    }

    this.post = function(params) {
        var f = new Future;
        request({
            uri: params.url,
            method: 'POST',
            header: header,
            form: params.form,
            timeout: 20000
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                var cookies = res.headers['set-cookie'];
                f.
                return (body)
            }
        });
        return f.wait();
    }
}

module.exports = request_base
