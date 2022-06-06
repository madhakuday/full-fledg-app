import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import '../stylesheet/HeaderDrawer.css';

export default class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      left: false,
      isLogedin: false,
    };
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState({ ...this.state, [anchor]: open });
  };

  list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={this.toggleDrawer(anchor, false)}
      style={{ backgroundColor: 'rgba(0,0,0,0.80)', height: '100%' }}
    >
      <List style={{ display: 'contents' }}>
        <ListItem>
          <Box className="dropdown_menu">
            {this.state.isLogedin === true ? (
              <ul>
                <li>
                  <Link to="/">Homes</Link>
                </li>
                <li>About us</li>
                <li>
                  <Link
                    style={{ color: 'white' }}
                    to="/movies"
                    rel="noopener noreferrer"
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link style={{ color: 'white' }} to="/cripto">
                    crypto
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>Homes</li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  componentDidMount() {
    const getlocaldata = localStorage.getItem('registerdata');

    if (getlocaldata) {
      this.setState({ isLogedin: true });
    }
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <Button onClick={this.toggleDrawer('left', true)}>
            <IconButton>
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          </Button>
          <SwipeableDrawer
            anchor={'left'}
            open={this.state['left']}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
          >
            {this.list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    );
  }
}
