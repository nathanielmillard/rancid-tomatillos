import React, { Component } from 'react'
import CommentsContainer from '../CommentsContainer/CommentsContainer'
import PropTypes from 'prop-types';

import { getOneMovie, rateMovie, deleteMovieRating } from '../../apiCalls.js'

import './MovieShowPage.scss'

class MovieShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      wrongInput: '',
      error: '',
      movie: '',
    }
  }

  componentDidMount = () => {
    getOneMovie(this.props.movieID).then(response => this.setState(response))
  }

  submitRating = () => {
    if (!Number.isInteger(+this.state.rating) || this.state.rating < 1 || this.state.rating > 10) {
      this.setState({ wrongInput: 'The number can only be a whole number between 1 and 10' });
      return;
    }
    const data = {
      "movie_id": this.props.movieID,
      rating: +this.state.rating
    }
    rateMovie(this.props.userID, data).then(() => this.props.populateUserRatings())
    this.setState({rating: '', wrongInput: '', error: ''});
  }

  updateRatingInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value})
  }

  deleteRating = () => {
    const foundRating = this.props.userMovieRatings.find(movie => movie.movie_id === this.state.movie.id);
    if (foundRating) {
      deleteMovieRating(this.props.userID, foundRating.id).then(() => {
        this.props.populateUserRatings()
      });

    } else {
      this.setState({error : 'We were not able to delete your rating.'});
    }
  }

  render() {
    const foundRating = this.props.userMovieRatings.find(rating => rating.movie_id === this.state.movie.id)
    let userRatingSection = '';
    let movieBackdrop = '';
    let movieBackdropAlt = 'No Backdrop Image Found'

    if (foundRating) {
      userRatingSection =
      <section>
        <h3 className='movie-user-rating'>Your Rating: {foundRating.rating}</h3>
        <button className='delete-user-rating' onClick={this.deleteRating}>Delete Rating</button>
      </section>
    } else {
      userRatingSection =
      <label htmlFor='rating'>Rate this movie:
        <input name='rating' type='number' min='1' max='10' onChange={this.updateRatingInput} />
        <button onClick={this.submitRating}>Submit</button>
      </label>
    }

    if (this.state.movie.backdrop_path && !this.state.movie.backdrop_path.includes('NoPhotoAvailable')){
      movieBackdrop = this.state.movie.backdrop_path
      movieBackdropAlt = this.state.movie.title + ' backdrop'
    }

    return (
      <section className='movie-show-page'>
        <img className='background' src={movieBackdrop} alt={movieBackdropAlt}/>
        <div className="movie-section">
          <img className='main-poster' src={this.state.movie.poster_path}  alt={this.state.movie.title + 'poster'}/>
          <div className='movie-info'>
            <h1>{this.state.movie.title}</h1>
            <h2>Release Date: {this.state.movie.release_date} </h2>
            <h3>Rating: {parseFloat(this.state.movie.average_rating).toFixed(1)} </h3>
            { (this.state.wrongInput || this.state.error) ? <h3>{this.state.wrongInput || this.state.error }</h3> : ''}
            { (this.props.userID) ?
              userRatingSection :
              <h3>Sign in to leave your own rating</h3>
            }
            <p>{this.state.movie.overview}</p>
          </div>
        </div>
        <section className='comments-container'>
          <CommentsContainer />
        </section>
      </section>
    )
  }
}

export default MovieShowPage

MovieShowPage.propTypes = {
  movieID: PropTypes.string.isRequired,
  userMovieRatings: PropTypes.array,
  userID: PropTypes.string,
  populateUserRatings: PropTypes.func.isRequired
}
