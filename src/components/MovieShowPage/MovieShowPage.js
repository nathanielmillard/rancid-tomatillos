import React from 'react'

const MovieShowPage = (props) => {
  console.log(props.movie)
  return (
  <section>
    <img className='background' src={props.movie.backdrop_path} alt={props.movie.title + 'backdrop'}/>
    <img className='mainPoster' src={props.movie.poster_path}  alt={props.movie.title + 'poster'}/>
    <h1>{props.movie.title}</h1>
    <h2>Release Date: {props.movie.release_date} </h2>
    <h3>Rating: {props.movie.average_rating} </h3>
    <p>{props.movie.overview}</p>
  </section>
)
}

export default MovieShowPage
