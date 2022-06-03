import React, { Component } from 'react';
import { Box, Container } from '@mui/material';

import { Typography } from 'antd';
//class
import '../stylesheet/Hero.css';

const { Title } = Typography;
export class Hero extends Component {
  render() {
    return (
      <>
        <Container className="hero_container">
          <Box className="hero_container_1_box">
            <Title style={{ color: 'white' }} level={2}>
              this is a blog site , <br /> in this you can find <br />
              movies , crypto , ext..
            </Title>
          </Box>
        </Container>
      </>
    );
  }
}

export default Hero;
