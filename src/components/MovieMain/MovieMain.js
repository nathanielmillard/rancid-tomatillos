import React, { Component } from 'react'

import MovieTile from '../MovieTile/MovieTile';

class MovieMain extends Component {
  constructor() {
    super();

    this.state = {
      loading: 'All Movies Trying To Load...',
      movies: []
    }
  }

  componentDidMount = () => {
    this.getAllMovieData();
  }

  getAllMovieData = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          alert('Something went wrong with our server')
        }
      })
      .then(data => {
        data.movies.sort((a,b)=>{
         return b.average_rating - a.average_rating
        })
        this.setState({loading: '', movies: data.movies})
      })
      .catch(error => {
        console.log(error)
        alert('We encountered an error, please reload page')
      }
      );
  }

  render() {
    const moviesComponents = this.state.movies.map(movie => <MovieTile key={movie.id} movie={movie} />)
    return (
      <section className="movie-directory">
        <h2>Top Rated Movies</h2>
        <section className='movie-main'>
          {
            this.state.loading !== '' ? this.state.loading :  moviesComponents
          }
        </section>
      </section>
    )
  }
}

export default MovieMain;
