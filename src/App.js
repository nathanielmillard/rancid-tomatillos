import React, { Component } from 'react';

import Navbar from './components/NavBar';

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: 'Nathaniel'
    }
  }

  render() {
    return (
      <main>
        {/* Sidebar component goes here */}
        <Navbar currentUser={this.state.currentUser} />
        <div className='movie-directory'>
          <h1>Overall Top Rated</h1>
        </div>
        {/* Movie Directory component goes here */}
      </main>
    );
  }
}

export default App;
