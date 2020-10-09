import React from 'react'
import {Link} from 'react-router-dom'

const MovieTile = (props) => {
  return (
    <article className='movie-tile'>
      <Link to={`/MovieShowPage/${props.movie.id}`}>
        <img src={props.movie.poster_path} alt={props.movie.title + " poster"}/>
      </Link>
      <h4 className='movie-title'>Rating: {props.movie.average_rating}</h4>
    </article>
  )
}

export default MovieTile;
