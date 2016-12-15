import './Nav.css';

import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const Nav = React.createClass({
  getInitialState() {
    return {
      current: 'list'
    };
  },
  handleClick(e) {
    console.log('click ', e.key);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <Row className="continer">
        <Col span={2}>
          <h2 className="c_title">CABBAGE</h2>
        </Col>
        <Col span={22}>
          <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            >
            <Menu.Item key="list">
              <Link to="/dashboard"><Icon type="home" />任务列表</Link>
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />任务操作</span>}>
              <Menu.Item key="create"><Link to="/create">创建任务</Link></Menu.Item>
              <Menu.Item key="import"><Link to="/import">导入计划任务</Link></Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="area-chart" />事件分析</span>}>
              <Menu.Item key="log"><Link to="/log">日志</Link></Menu.Item>
            </SubMenu>

            <Menu.Item key="alipay">
              <a href="https://www.github.com/sevnote/cabbage" target="_blank" rel="noopener noreferrer"><Icon type="question" />问题反馈</a>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    )
  }
}
)
export default Nav;
