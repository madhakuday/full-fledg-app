import React, { Component } from 'react';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import MoviesMain from '../components/MoviesPageComponents/MoviesMain';

export class MoviesPage extends Component {
  render() {
    return (
      <>
        <Container>
          <Header />
          <MoviesMain />
        </Container>
      </>
    );
  }
}

export default MoviesPage;
