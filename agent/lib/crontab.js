var Future = require('fibers/future');
var crontab = require('crontab');


var crontab_base = function() {
    this.load = function() {
        var f = new Future;
        crontab.load(function(error, crontab) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (crontab.jobs())
            }
        });
        return f.wait();
    }



    this.create = function(cmd, schedule, comment) {
        var f = new Future;
        crontab.load(function(error, crontab) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                crontab.create(cmd, schedule, comment)
                crontab.save(function(err, crontab) {
                    f.return(crontab)
                });
            }
        });
        return f.wait();
    }

}

module.exports = crontab_base
