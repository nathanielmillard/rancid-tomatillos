import React, { Component } from 'react';

import Navbar from './components/Navbar/NavBar';
import SignIn from './components/Sign-In/Sign-In';
import MovieMain from './components/MovieMain/MovieMain';
import { Route, Switch, Redirect } from 'react-router-dom'


import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: '',
      id: ''
      //maybe consider Nan lets do research
    }
  }

  logInUser = (user) => {
    console.log(user)
    this.setState({currentUser: user.user.name, id: user.user.id})
    // this.setState(user.user) potential refactor later
  }

  logOutUser = () => {
    this.setState({currentUser: '', id: ''})
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
