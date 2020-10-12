import React, { Component } from 'react'

import MovieTile from '../MovieTile/MovieTile';

import {getAllMovies} from '../../apiCalls.js'

class MovieMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 'All Movies Trying To Load...',
      movies: [],
      error: ''
    }
  }

  componentDidMount = () => {
    this.getAllMovieData();
  }

  getAllMovieData = () => {
    getAllMovies().then(response => this.setState(response))
  }

  render() {
    const moviesComponents = this.state.movies.map(movie => <MovieTile key={movie.id} movie={movie} userMovieRating={this.props.currentUser.ratings} />)
    return (
      <section className="movie-directory">
        <h2>Top Rated Movies</h2>
        <section className='movie-main'>
          {
            this.state.loading !== '' ? this.state.loading :  moviesComponents
          }
          { (this.state.error) ? this.state.error : ''}
        </section>
      </section>
    )
  }
}

export default MovieMain;
