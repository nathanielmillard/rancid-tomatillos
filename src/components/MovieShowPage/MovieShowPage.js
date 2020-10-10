import React from 'react'

const MovieShowPage = (props) => {
  console.log(props.movie)
  return (
  <section className='movie-show-page'>
    <img className='background' src={props.movie.backdrop_path} alt={props.movie.title + 'backdrop'}/>
    <div className="movie-section">
      <img className='main-poster' src={props.movie.poster_path}  alt={props.movie.title + 'poster'}/>
      <div className='movie-info'>
        <h1>{props.movie.title}</h1>
        <h2>Release Date: {props.movie.release_date} </h2>
        <h3>Rating: {props.movie.average_rating} </h3>
        <p>{props.movie.overview}</p>
      </div>
    </div>
  </section>
)
}

export default MovieShowPage
