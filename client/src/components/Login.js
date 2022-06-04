import React, { Component } from 'react';
import { Box, Container } from '@mui/material';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';

import '../stylesheet/login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }
  onFinish(values) {
    const { username, email, password } = values;

    const result = axios
      .post('/api/loginuser', {
        username,
        email,
        password,
      })
      .then((data) => {
        if (data.status === 200) {
          message.success('Done');
          const locdata = localStorage.setItem('registerdata', data.data.token);
          this.setState({ redirect: true });
        }
      })
      .catch((err) => {});
  }

  onFinishFailed(errorInfo) {
    message.error('fullfield all field');
  }

  componentDidMount() {
    const checklogin = localStorage.getItem('registerdata');
    if (checklogin) {
      this.setState({ redirect: true });
    }
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Container>
          <Box className="form_box_1">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
              style={{ color: 'white' }}
            >
              <Form.Item
                type="email"
                style={{ color: 'inherit' }}
                label="Email  "
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Box>
        </Container>
      </>
    );
  }
}

export default Login;
