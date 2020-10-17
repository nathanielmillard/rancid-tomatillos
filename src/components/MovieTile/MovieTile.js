import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

import './MovieTile.scss'
import favoriteButton from '../../images/favorite-button.svg'

const MovieTile = (props) => {
  let imagesource = favoriteButton
  let altCaption = 'Favorite this movie'
  const handleClick = () => { props.toggleFavorite(props.movie) }
  const foundRating = props.userMovieRatings.find(rating => rating.movie_id === props.movie.id)
  return (
    <article className='movie-tile'>
      <Link to={`/MovieShowPage/${props.movie.id}`}>
        <img src={props.movie.poster_path} alt={props.movie.title + " poster"}/>
      </Link>
      <div className='movie-tile-footer'>
      <button className='favorite-button' onClick={handleClick}>
        <img src={imagesource} alt={altCaption}/>
      </button>
      <h4 className='movie-rating'>Rating: {props.movie.average_rating.toFixed(1)}</h4>
      </div>
      { (foundRating) ? <h4 className='movie-user-rating'>Your Rating: {foundRating.rating}</h4> : '' }
    </article>
  )
}

export default MovieTile;

MovieTile.propTypes = {
  userMovieRatings: PropTypes.array,
  movie: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func
}
