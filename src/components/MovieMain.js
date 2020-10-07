import React, { Component } from 'react'

import MovieTile from './MovieTile';

class MovieMain extends Component {
  constructor() {
    super();

    this.state = {
      loading: 'All Movies Loading...',
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
        data.movies.sort((a,b)=>{
         return b.average_rating - a.average_rating
        })
        this.setState({loading: '', movies: data.movies})
      });
  }

  render() {
    const moviesComponents = this.state.movies.map(movie => <MovieTile movie={movie} />)
    return (
      <section className='movie-main'>
        {
          this.state.loading !== '' ? this.state.loading :  moviesComponents 
        }
      </section>
    )
  }
}

export default MovieMain;
