import React from 'react'

const MovieTile = (props) => {
  return (
    <article className='movie-tile'>
      <img src={props.movie.poster_path} alt={props.movie.title + " poster"} />
      <h4 className='movie-title'>Rating: {props.movie.average_rating}</h4>
    </article>
  )
}

export default MovieTile;