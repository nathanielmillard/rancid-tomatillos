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
    this.props.populateUserFeedback(this.props.currentUserInfo.currentUser.id)
  }

  getAllMovieData = () => {
    getAllMovies().then(response => {
      this.setState(response)
    })
  }

  toggleFavorite = (specificMovie, target) => {
    toggleFavoriteMovie(specificMovie)
    this.props.populateUserFeedback(this.props.currentUserInfo.currentUser.id);
  }

  filterDisplay = () => {
    if (this.props.view === 'all') {
      return this.state.movies.map(movie => {
        return (
          <MovieTile
          key={movie.id}
          movie={movie}
          userMovieRatings={this.props.currentUserInfo.ratings}
          userFavorites={this.props.currentUserInfo.favorites}
          userID={this.props.currentUserInfo.currentUser.id}
          populateUserFeedback={this.props.populateUserFeedback}
          />
        )
      })
    } else if (this.props.view === 'favorites' && this.props.currentUserInfo.currentUser.id) {
      let favoriteList = this.state.movies.reduce((favorites, movie) => {
        if (this.props.currentUserInfo.favorites.includes(movie.id)){
          favorites.push(
            <MovieTile
              key={movie.id}
              userID={this.props.currentUserInfo.currentUser.id}
              movie={movie}
              userMovieRatings={this.props.currentUserInfo.ratings}
              userFavorites={this.props.currentUserInfo.favorites}
              populateUserFeedback={this.props.populateUserFeedback}
            />
          )
        }
        return favorites
      }, [])
      if (favoriteList.length > 0) {
        return favoriteList
      } else {
        return <h2>You have no favorites</h2>
      }
    } else if (this.props.view === 'favorites' && !this.props.currentUserInfo.currentUser.id) {
      return <h2>Sign in to save favorites!</h2>
    }
  }

  render() {
    return (
      <section className="movie-directory">
        <h2>Top Rated Movies</h2>
        <section className='movie-main'>
          {
            this.state.loading !== '' ? this.state.loading :  this.filterDisplay()
          }
          { (this.state.error) ? this.state.error : ''}
        </section>
      </section>
    )
  }
}

export default MovieMain;

MovieMain.propTypes = {
  currentUserInfo: PropTypes.object.isRequired,
  populateUserFeedback: PropTypes.func.isRequired
}
