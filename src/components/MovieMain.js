import React, { Component } from 'react'

import MovieTile from './MovieTile';

class MovieMain extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    }
  }

  componentDidMount = () => {
    this.getAllMovieData();
  }

  getAllMovieData = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(data => {
        console.log('here with componentDidMount')
        this.setState({movies: data.movies})
      });
  }

  render() {
    return (
      <section className='movie-main'>
        {
          this.state.movies.map(movie => <MovieTile movie={movie} />)
        }
      </section>
    )
  }
}

export default MovieMain;