import React, { Component } from 'react';

import Navbar from './components/NavBar';
import SignIn from './components/Sign-In';
import MovieMain from './components/MovieMain';
import { Route, Switch } from 'react-router-dom'


import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: ''
    }
  }

  render() {
    return (
      <main>
        <Navbar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={MovieMain}/>
          <Route exact path="/sign-in" component={ SignIn }/>
        </Switch>
      </main>
    );
  }
}

export default App;
