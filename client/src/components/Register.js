import React, { Component } from 'react';
import { Box, Container } from '@mui/material';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';

///css

import '../stylesheet/register.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }
  async onFinish(values) {
    const { username, email, password } = values;

    const result = await axios.post('/api/registeruser', {
      username,
      email,
      password,
    });

    if (result.status === 200) {
      message.success('Done');

      const locdata = localStorage.setItem('registerdata', result.data);
      this.setState({ redirect: true });
    }
  }
  onFinishFailed(errorInfo) {
    message.error('fullfield all field');
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
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
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

export default Register;
