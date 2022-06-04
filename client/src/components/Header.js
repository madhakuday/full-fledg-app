import React, { Component } from 'react';
import { Box, IconButton, Toolbar } from '@mui/material';

import { Divider, Dropdown, Menu } from 'antd';

//css
import '../stylesheet/Header.css';
import HeadreDrawer from './HeaderDrawer';
import { Link } from 'react-router-dom';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { isLogedin: false };
  }
  menu = (
    <Menu
      style={{ display: 'flex', flexDirection: 'column' }}
      items={[
        {
          key: '1',
          label: <Link to="/movies">Movies</Link>,
        },
        {
          key: '2',
          label: <Link to="/cripto">Cripto</Link>,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

  componentDidMount() {
    const getlocaldata = localStorage.getItem('registerdata');

    if (getlocaldata === 'undefined' || getlocaldata === null) {
      this.setState({ isLogedin: false });
    } else {
      this.setState({ isLogedin: true });
    }
  }

  render() {
    return (
      <>
        {this.state.isLogedin === true ? (
          <Box className="header_1_box">
            <Toolbar>
              <Box className="mobile_header">
                <HeadreDrawer> </HeadreDrawer>
              </Box>
              <Box className="big_screen_menu">
                <Box>
                  <IconButton color="inherit">Icon</IconButton>
                </Box>
                <Box>
                  <ul>
                    <li>
                      <Link to="/">Homes</Link>
                    </li>
                    <li>About us</li>
                    <Dropdown overlay={this.menu} placement="bottomLeft" arrow>
                      <li>section</li>
                    </Dropdown>
                  </ul>
                </Box>
              </Box>
            </Toolbar>
          </Box>
        ) : (
          <>
            <Box className="header_1_box">
              <Toolbar>
                <Box className="mobile_header">
                  <HeadreDrawer> </HeadreDrawer>
                </Box>
                <Box className="big_screen_menu">
                  <Box>
                    <IconButton color="inherit">Icon</IconButton>
                  </Box>
                  <Box>
                    <ul>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Toolbar>
            </Box>
            <Divider style={{ color: 'white' }}>
              register to show movie and crypto etc..
            </Divider>
          </>
        )}
      </>
    );
  }
}

export default Header;
