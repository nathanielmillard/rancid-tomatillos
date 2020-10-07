import React, { Component } from 'react';

import Navbar from './components/NavBar';
import SignIn from './components/Sign-In';
import MovieMain from './components/MovieMain';
import { Route, Switch, Redirect } from 'react-router-dom'


import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: ''
    }
  }

  logInUser = () => {
    this.setState({currentUser: 'Lucy'})
  }

  logOutUser = () => {
    this.setState({currentUser: ''})
  }

  render() {
    return (
      <main>
        <Navbar currentUser={this.state.currentUser} signOut = {this.logOutUser} />
        <Switch>
          <Route exact path="/" component={MovieMain}/>
          <Route exact path="/sign-in" render={
            () => { if (this.state.currentUser === 'Lucy'){
              return <Redirect to="/"/>
            } else {
              return <SignIn logIn={this.logInUser}/>
            }} }/>
        </Switch>
      </main>
    );
  }
}

export default App;
