import { Container } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

export class Main extends Component {
  render() {
    return (
      <>
        <Container>
          <Header />
          <Hero />
          {/* <Footer /> */}
        </Container>
      </>
    );
  }
}

export default Main;
