import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,notification} from 'antd';
import reqwest from 'reqwest';


const FormItem = Form.Item;
const Option = Select.Option;

const ImportForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  fetch(params = {}) {
        console.log('params:', params);
        let url = 'http://www.cbpass.net:7600/Load'
        reqwest({
            url: url,
            method: 'post',
            data: {
                ...params,
        },
    type: 'json',
  }).then((data) => {
    if(data.RetCode === 0){
      this.openNotification('success')
    }else{
      this.openNotification('error')
    }
    
});
    },
  openNotification(type) {
   notification[type]({
    message: '导入完成',
    description: '已操作',
  });
    },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.fetch(values)
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassowrd(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <div>
        <br />
        <Form horizontal onSubmit={this.handleSubmit}>
                 <FormItem
            {...formItemLayout}
            label="选择目标IP"
            hasFeedback
            >
            {getFieldDecorator('ip', {
              rules: [{
                required: true, message: '必须指定目标IP',
              }],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择IP"
                optionFilterProp="children"
                >
                <Option value="10.10.158.62">10.10.158.62</Option>
                <Option value="114.114.114.114">114.114.114.11</Option>
                <Option value="8.8.8.8">8.8.8.8</Option>
              </Select>
              ) }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" onChange={this.handleSubmit}>导入任务</Button>
          </FormItem>
        </Form>
      </div>
    );
  },
}));


module.exports = ImportForm;

