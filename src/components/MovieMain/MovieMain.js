import React, { Component } from 'react'

import PropTypes from 'prop-types'

import MovieTile from '../MovieTile/MovieTile';

import {getAllMovies, toggleFavoriteMovie} from '../../apiCalls.js'

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
    this.props.populateUserFeedback(this.props.currentUser.id)
  }

  getAllMovieData = () => {
    getAllMovies().then(response => {
      this.setState(response)
    })
  }
  toggleFavorite = (specificMovie, target) => {
    toggleFavoriteMovie(specificMovie)
    this.props.populateUserFeedback(this.props.currentUser.id);
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
          userID={this.props.currentUser.id}
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
