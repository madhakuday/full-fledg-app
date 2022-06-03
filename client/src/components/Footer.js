import React, { Component } from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';

//css
import '../stylesheet/Footer.css';
export class Footer extends Component {
  render() {
    return (
      <>
        <Container>
          <Box style={{ padding: '10px', margin: '15px 0' }}>
            <ul>
              <li>footer 1 </li>
              <li>footer 2 </li>
              <li>footer 3 </li>
            </ul>
            <ul>
              <li>footer 1 </li>
              <li>footer 2 </li>
              <li>footer 3 </li>
            </ul>
            <ul>
              <li>footer 1 </li>
              <li>footer 2 </li>
              <li>footer 3 </li>
            </ul>
          </Box>
        </Container>
      </>
    );
  }
}

export default Footer;
