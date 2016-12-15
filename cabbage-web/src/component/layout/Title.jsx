// CSS
import './Title.css';

// JS

// Modules
import React from 'react';
import { Row, Col } from 'antd';

// Components

export default class Title extends React.Component {
  render() {
    return (
        <Row className="c_title pull-left">
          <Col>
            <h1>{this.props.title}</h1>
          </Col>
        </Row>
    );
  }
};
