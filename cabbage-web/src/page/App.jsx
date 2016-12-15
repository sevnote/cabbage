// CSS
import './App.less';

// Modules
import React from 'react';
import { Row, Col } from 'antd';

// Components
import Header from '../component/layout/Header.jsx';
import Footer from '../component/layout/Footer.jsx';
import Nav from '../component/layout/Nav.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      navSpan: "4",
      contentSpan: "20"
    };
  }

  switchNav = () => {
    if (this.state.collapse) {
      this.setState({
        collapse: false,
        navSpan: "1",
        contentSpan: "23"
      });
    } else {
      this.setState({
        collapse: true,
        navSpan: "4",
        contentSpan: "20"
      });
    }
  };

  render = () => {
    const navLayout = {
      span: this.state.navSpan,
      className: 'c_nav_box'
    };
    const contentLayout = {
      span: this.state.contentSpan,
      className: 'c_content_box'
    };
    return (
      <div className="c_app">
        <Row>
          <Col {...navLayout} span={24}>
            <Nav switchNav={this.switchNav} />
          </Col>
          <Col {...contentLayout} span={24}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
};

