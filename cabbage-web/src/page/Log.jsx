import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import { Table, Icon, Modal, Button } from 'antd';
import reqwest from 'reqwest';
import { Label } from 'react-bootstrap';
import moment from 'moment';
import qs from 'qs'


const Log = React.createClass({
    getInitialState() {
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '5%',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                width: '10%',
            }, {
                title: '分钟',
                dataIndex: 'minute',
                width: '4%',
                sorter: (a, b) => a.minute - b.minute,
            }, {
                title: '小时',
                dataIndex: 'hour',
                width: '4%',
                sorter: (a, b) => a.hour - b.hour,
            }, {
                title: '日期',
                dataIndex: 'dom',
                width: '4%',
                sorter: (a, b) => a.dom - b.dom,
            }, {
                title: '月份',
                dataIndex: 'month',
                width: '4%',
                sorter: (a, b) => a.month - b.month,
            }, {
                title: '星期',
                dataIndex: 'dow',
                width: '4%',
                sorter: (a, b) => a.dow - b.dow,
            }, {
                title: '命令',
                dataIndex: 'command',
                width: '35%',
            },
            {
                title: '备注',
                dataIndex: 'comment',
                width: '10%'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: '10%',
                sorter: (a, b) => a.createTime - b.createTime,
                render(text) {
                    return text ? moment.unix(text).format('YY-MM-DD HH:mm') : 0
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                width: '10%',
                sorter: (a, b) => a.updateTime - b.updateTime,
                render(text) {
                    return text ? moment.unix(text).format('YY-MM-DD HH:mm') : 0
                }
            },
            {
                title: '操作',
                width: '5%',
                render: () => <Button type='primary' size='small' onClick={this.showModal}>详情</Button>
            }]

        return {
            data: [],
            pagination: {},
            oading: false
        }
    },

    componentDidMount() {
        this.fetch();
    },

    fetch(params = {}) {
        console.log('params:', params);
        let querystring = (qs.stringify(params))
        console.log(querystring)
        this.setState({ loading: true });
        let url = 'http://www.cbpass.net:7600/CronList'
        reqwest({
            url: url,
            method: 'get',
            data: {
                results: 10,
                ...params,
        },
    type: 'json',
}).then((data) => {
    console.log(data)
    const pagination = this.state.pagination;
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = data.Data.Total
    this.setState({
        loading: false,
        data: data.Data.Data,
        pagination,
    });
});
    },

showModal() {
    this.setState({
        visible: true,
    });
},

handleOk() {
    console.log('Clicked OK');
    this.setState({
        visible: false,
    });
},

handleCancel(e) {
    console.log(e);
    this.setState({
        visible: false,
    });
},

handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
        pagination: pager,
    });
    this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
      ...filters,
    });
  },

render() {
    return (
        <div>
            <Table columns={this.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                />
            <Modal title="详情" visible={this.state.visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
                maskClosable={true}
                >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    );
}
});

module.exports = Log;


