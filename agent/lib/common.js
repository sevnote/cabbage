var fibers = require('fibers');
var request = require('./request');
var util = require('util');

exports.succeed = function(action, data) {
    return {
        RetCode: 0,
        Action: action,
        Data: data
    }
}

exports.fail = function(code, action, error) {
    return {
        RetCode: code,
        Action: action,
        ErrorMessage: error
    }
}


exports.CheckInt = function(num) {
    if (arguments.length != 1 || isNaN(num) || num.match(/[\.-]/)) {
        return false;
    }
    if (num < 2147483648) {
        return true;
    }
    return false;
}

exports.ModifyJosnKey = function(json, oddkey, newkey) {
    var val = json[oddkey];
    delete json[oddkey];
    json[newkey] = val;
}

exports.getParamsKey = function(params) {
    var str = "";
    for (var i in params) {
        str += i + ":" + params[i] + ",";
    }
    return str.substring(0, str.length - 1);
}

exports.sizeof = function(str,charset) {
    var total = 0,
        charCode,
        i,
        len;

    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
}

