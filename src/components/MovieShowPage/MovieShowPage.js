import React, { Component } from 'react'

class MovieShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      wrongInput: '',
      error: ''
    }
  }

  submitRating = () => {
    if (!Number.isInteger(+this.state.rating) || this.state.rating < 1 || this.state.rating > 10) {
      this.setState({ wrongInput: 'The number can only be a whole number between 1 and 10' });
      return;
    }
    const data = {
      "movie_id": this.props.movie.id,
      rating: +this.state.rating
    }
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.userID}/rat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        this.setState({error: 'We were not able to save your rating. Please refresh and try again.'})
      }
    })
    .then(() => this.props.getUserRatings())
    .catch(error => {
      console.log(error);
      this.setState({error: 'We were not able to save your rating. Please refresh and try again.'})
    })
    this.setState({rating: '', wrongInput: '', error: ''});
  }

  updateRatingInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value})
  }

  render() {
    const foundRating = this.props.userMovieRating.find(rating => rating.movie_id === this.props.movie.id)
    let userRatingSection = '';
    
    if (foundRating) {
      userRatingSection = <h3 className='movie-user-rating'>Your Rating: {foundRating.rating}</h3>
    } else {
      userRatingSection = 
      <label htmlFor='rating'>Rate this movie:
        <input name='rating' type='number' min='1' max='10' onChange={this.updateRatingInput} />
        <button onClick={this.submitRating}>Submit</button>
      </label>
    } 
              
    return (
      <section className='movie-show-page'>
        <img className='background' src={this.props.movie.backdrop_path} alt={this.props.movie.title + 'backdrop'}/>
        <div className="movie-section">
          <img className='main-poster' src={this.props.movie.poster_path}  alt={this.props.movie.title + 'poster'}/>
          <div className='movie-info'>
            <h1>{this.props.movie.title}</h1>
            <h2>Release Date: {this.props.movie.release_date} </h2>
            <h3>Rating: {parseFloat(this.props.movie.average_rating).toFixed(1)} </h3>
            { this.state.wrongInput || this.state.error ? <h3>{this.state.wrongInput || this.state.error }</h3> : ''}
            { (this.props.userID) ?
              userRatingSection :
              <h3>Sign in to leave your own rating</h3>
            }
            <p>{this.props.movie.overview}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default MovieShowPage
