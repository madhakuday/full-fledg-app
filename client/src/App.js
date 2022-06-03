import React, { Component } from 'react';

//component
import Main from './pages/Main';
import Singelcard from './components/MoviesPageComponents/Singelcard';
import MoviesPage from './pages/MoviesPage';
import Login from './components/Login';

import { BrowserRouter, Route } from 'react-router-dom';

import { Switch } from 'react-router-dom';
import Cryptoomain from './components/Cryptopage/Cryptoomain';
import Singelcrypto from './components/Cryptopage/Singelcrypto';
import Register from './components/Register';

import { Redirect } from 'react-router';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogdin: false };
  }

  componentDidMount() {
    const getlocaldata = localStorage.getItem('registerdata');

    if (getlocaldata) {
      this.setState({ isLogdin: true });
    }
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            {this.state.isLogdin === true ? (
              <>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/movies">
                  <MoviesPage />
                </Route>

                <Route exact path="/scard/:page/:id">
                  <Singelcard />
                </Route>

                <Route exact path="/cripto">
                  <Cryptoomain />
                </Route>

                <Route exact path="/scripto/:id">
                  <Singelcrypto />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/register">
                  {this.state.isLogdin === true ? <Main /> : <Register />}
                </Route>
                <Route exact path="/login">
                  {this.state.isLogdin === true ? <Main /> : <Login />}
                </Route>
              </>
            )}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
