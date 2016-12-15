import reqwest from 'reqwest';
import { notification, message } from 'antd';
import WebConfig from './WebConfig';
import _ from 'underscore';

const ApiMixin = {
  api: function (action, params = {}, callback, method = 'get', type = 'json') {
    let url = WebConfig.api_url;
    let data = { action };
    _.extend(data, params);

    reqwest({
      url,
      method,
      data,
      type,
      crossOrigin: true,
      success: (result) => {
        let retCode = result.retCode;
        if (retCode == 403) {
          this.openTip('error', action + ' - 没有权限执行访问')
        } else if (retCode != 0) {
          this.openTip('error', result.message)
        }

        callback(result);
      }
    })
  },
  getFilters: function (filterName, data) {
    const items = _.uniq(_.pluck(data || this.state.data, filterName));
    let filters = [];
    _.each(items, function (item) {
      filters.push({
        text: item,
        value: item
      })
    });
    return filters;
  },
  exportCsv: function (columns, keys, data) {
    let exportStr = "\uFEFF";
    columns = columns.join(',');
    exportStr += (columns + "\n");
    data.map(function (item) {
      let dataStr = "";
      let itemStr = "";
      keys.map(function (key) {
        if (typeof key == 'object') {
          for (let index in key) {
            let callback = key[index];
            itemStr = callback(item[index]);
          }
        } else {
          itemStr = item[key];
        }
        // dataStr += '"' + ('\t' + itemStr || '') + '"' + ","
        dataStr += '"' + (itemStr || '') + '"' + ","
      });
      dataStr = dataStr.substring(0, dataStr.length - 1) + "\n";
      exportStr += dataStr;
    });

    let blob = new Blob([exportStr], { type: 'text/csv, charset=UTF-8' });
    let href = URL.createObjectURL(blob);
    return href;
  },
  openTip: function (type, msg) {
    notification[type]({
      message: '通知',
      description: msg
    });
  },
  openMsg: function (type, msg, time) {
    if (time) {
      return message[type](msg, time);
    } else {
      return message[type](msg);
    }
  },
};

export default ApiMixin;
