import React, { Component } from 'react';

import Navbar from './components/NavBar';
import MovieMain from './components/MovieMain';

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
        <Navbar currentUser={this.state.currentUser} />
        <section class="movie-directory">
          <h2>Top Rated Movies</h2>
          <MovieMain />
        </section>
      </main>
    );
  }
}

export default App;
