var Future = require('fibers/future');
var mysql = require('mysql');
var _ = require('underscore');
var DbActiverecord = require('mysql-activerecord');

var mysql_base = function(config) {
    config = _.extend({
        connectionLimit: 10000
    }, config);

    var _pool = mysql.createPool(config);

    var _get_adapter = function() {
        var f = new Future;
        _pool.getConnection(function(err, conn) {
            if (err) {
                console.error(err);
                f.
                return (false);
            } else {
                f.
                return (new DbActiverecord.Adapter({
                    pool: {
                        pool: _pool,
                        connection: conn
                    }
                }));
            }
        });
        return f.wait();
    }

    this.query = function(sql) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .query(sql, function(err, results) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (results);
                }
            });
        return f.wait();
    }

    this.select = function(field, table, where) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .select(field)
            .where(where)
            .get(table, function(err, results) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (results);
                }
            });
        return f.wait();
    }


    this.get = function(table_name) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter.get(table_name, function(err, results) {
            adapter.releaseConnection();
            if (err) {
                console.info(err);
                f.
                return (false);
            } else {
                f.
                return (results);
            }
        });
        return f.wait();
    }


    this.delete = function(table_name, conditions) {
        var f = new Future;
        if (conditions === undefined) {
            console.log(err);
            f.
            return (false);
        }
        var adapter = _get_adapter();
        adapter
            .where(conditions)
            .delete(table_name, function(err, results) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (results);
                }
            });
        return f.wait();
    }

    this.datatable = function(table_name, conditions, limit_count, limit_start, order_action) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .where(conditions)
            .limit(limit_count, limit_start)
            .order_by(order_action)
            .get(table_name, function(err, results) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (results);
                }
            });
        return f.wait();
    }

    this.datatable_count = function(table_name, conditions, limit_count, limit_start, order_action) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .where(conditions)
            .limit(limit_count, limit_start)
            .order_by(order_action)
            .count(table_name, function(err, results) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (results);
                }
            });
        return f.wait();
    }

    this.countAll = function(table_name) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter.count(table_name, function(err, results) {
            adapter.releaseConnection();
            if (err) {
                console.info(err);
                f.
                return (false);
            } else {
                f.
                return (results);
            }
        });
        return f.wait();
    }



    this.insert = function(table_name, data) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter.insert(table_name, data, function(err, info) {
            adapter.releaseConnection();
            if (err) {
                console.info(err);
                f.
                return (false);
            } else {

                f.
                return (info);
            }
        });
        return f.wait();
    }

    this.insert_ignore = function(table_name, data) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter.insert_ignore(table_name, data,function(err, info) {
            adapter.releaseConnection();
            if (err) {
                console.info(err);
                f.
                return (false);
            } else {

                f.
                return (info);
            }
        });
        return f.wait();
    }

    this.update = function(table_name, where, data) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .where(where)
            .update(table_name, data, function(err) {
                adapter.releaseConnection();
                if (err) {
                    console.info(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (true);
                }
            });
        return f.wait();
    }

    this.get_where_in = function(table_name, field, conditions) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .where(field, conditions)
            .get(table_name, function(err, rows, fields) {
                adapter.releaseConnection();
                if (err) {
                    console.log(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (rows);
                }
            });
        return f.wait();
    }

    this.where = function(table_name, conditions) {
        var f = new Future;
        var adapter = _get_adapter();
        adapter
            .where(conditions)
            .get(table_name, function(err, rows, fields) {
                adapter.releaseConnection();
                if (err) {
                    console.log(err);
                    f.
                    return (false);
                } else {
                    f.
                    return (rows);
                }
            });
        return f.wait();
    }


}

module.exports = mysql_base;
