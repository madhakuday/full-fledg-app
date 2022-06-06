import React, { Component } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import MovieIcon from '@mui/icons-material/Movie';

import LiveTvIcon from '@mui/icons-material/LiveTv';

export default class MovieMenubar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.filterhendler = this.filterhendler.bind(this);
  }

  filterhendler(val) {
    return this.props.getvalue(val);
  }
  render() {
    return (
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setState({ value: newValue });
          }}
        >
          <BottomNavigationAction
            onClick={() => this.filterhendler('all')}
            label="All"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            onClick={() => this.filterhendler('movie')}
            label="Movies"
            icon={<MovieIcon />}
          />
          <BottomNavigationAction
            onClick={() => this.filterhendler('tv')}
            label="Tv"
            icon={<LiveTvIcon />}
          />
        </BottomNavigation>
      </Box>
    );
  }
}
