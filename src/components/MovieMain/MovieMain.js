import React, { Component } from 'react'

import PropTypes from 'prop-types'

import MovieTile from '../MovieTile/MovieTile';

import {getAllMovies, addFavoriteMovie} from '../../apiCalls.js'

import './MovieMain.scss'

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
    getAllMovies().then(response => {
      this.setState(response)
    })
  }
  toggleFavorite = (specificMovie, target) => {
    if (target === 'Favorite this movie') {
      addFavoriteMovie(specificMovie)
    } else if (target === 'Unfavorite this movie') {
      console.log('Made It Here')
    }
    this.props.populateUserFeedback();
  }
  render() {
    const moviesComponents = this.state.movies.map(movie => {
      return (
        <MovieTile
          key={movie.id}
          movie={movie}
          userMovieRatings={this.props.currentUser.ratings}
          userFavorites={this.props.currentUser.favorites}
          toggleFavorite={this.toggleFavorite}
        />
      )
    })
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

MovieMain.propTypes = {
  currentUser: PropTypes.object,
  populateUserFeedback: PropTypes.func
}
