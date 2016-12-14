var Future = require('fibers/future');
var redis = require('redis');

var redis_base = function(config) {

    var client = redis.createClient(config.port, config.host)
    client.select(config.select);

    this.setnx = function(key, value) {
        var f = new Future;
        client.setnx(key, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }


    this.keys = function(key) {
        var f = new Future;
        client.keys(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.get = function(key) {
        var f = new Future;
        client.get(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.llen = function(key) {
        var f = new Future;
        client.llen(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.brpop = function(key, num) {
        var f = new Future;
        client.brpop(key, num, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.exists = function(key) {
        var f = new Future;
        client.exists(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }


    this.lrange = function(key,start,end) {
        var f = new Future;
        client.lrange(key, start,end, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.hset = function(key, field, value) {
        var f = new Future;
        client.hset(key, field, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
            client.quit()
        });
        return f.wait();
    }

    this.llrange = function(key, range) {
        var f = new Future;
        client.llrange(key, field, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
            client.quit()
        });
        return f.wait();
    }

    this.hget = function(key, field) {
        var f = new Future;
        client.hset(key, field, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
            client.quit()
        });
        return f.wait();
    }
    this.expire = function(key, time) {
        var f = new Future;
        client.expire(key, time, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
            client.quit()
        });
        return f.wait();
    }

}

module.exports = redis_base
