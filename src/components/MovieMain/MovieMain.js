import React, { Component } from 'react'

import MovieTile from '../MovieTile/MovieTile';

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
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/mov')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          this.setState({ error: 'We encountered an error, please reload page' });
        }
      })
      .then(data => {
        data.movies.sort((a,b)=>{
         return b.average_rating - a.average_rating
        })
        this.setState({loading: '', movies: data.movies, error: '' })
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: 'We encountered an error, please reload page' });
      }
      );
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
