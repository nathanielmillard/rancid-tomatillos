import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

import './MovieTile.scss'

const MovieTile = (props) => {
  const foundRating = props.userMovieRating.find(rating => rating.movie_id === props.movie.id)
  return (
    <article className='movie-tile'>
      <Link to={`/MovieShowPage/${props.movie.id}`}>
        <img src={props.movie.poster_path} alt={props.movie.title + " poster"}/>
      </Link>
      <h4 className='movie-rating'>Rating: {props.movie.average_rating.toFixed(1)}</h4>
      { (foundRating) ? <h4 className='movie-user-rating'>Your Rating: {foundRating.rating}</h4> : '' }
    </article>
  )
}

export default MovieTile;

MovieTile.propTypes = {
  movie: PropTypes.object.isRequired
}
