import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import FavoriteButton from '../FavoriteButton/FavoriteButton';

import './MovieTile.scss'
import favoriteButton from '../../images/favorite-button.svg'
import unfavoriteButton from '../../images/unfavorite-button.svg'

const MovieTile = (props) => {
  let imagesource = favoriteButton
  let altCaption = 'Favorite this movie'
  const handleClick = (e) => { props.toggleFavorite(props.movie, e.target.alt) }
  const foundRating = props.userMovieRatings.find(rating => rating.movie_id === props.movie.id)
  const foundFavorite = props.userFavorites.find(favorite => favorite === props.movie.id)
  let isAFavorite = false
  if(foundFavorite) {
    isAFavorite = true
  }
  const renderFavoriteButton = (id) => {
    if(id) {
      return (<FavoriteButton
        userID={props.userID}
        movieID={props.movie.id}
        isAFavorite={isAFavorite}
        populateUserFeedback={props.populateUserFeedback}
      />)
    } else {
      return
    }
  }

  return (
    <article className='movie-tile'>
      <Link to={`/MovieShowPage/${props.movie.id}`}>
        <img src={props.movie.poster_path} alt={props.movie.title + " poster"}/>
      </Link>
      <div className='movie-tile-footer'>
      {renderFavoriteButton(props.userID)}
      <h4 className='movie-rating'>Rating: {props.movie.average_rating.toFixed(1)}</h4>
      </div>
      { (foundRating) ? <h4 className='movie-user-rating'>Your Rating: {foundRating.rating}</h4> : '' }
    </article>
  )
}

export default MovieTile;

MovieTile.propTypes = {
  userID: PropTypes.number,
  userMovieRatings: PropTypes.array,
  userUserFavorites: PropTypes.array,
  movie: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func
}
