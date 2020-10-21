import React from 'react'
import PropTypes from 'prop-types';

import favoriteButton from '../../images/favorite-button.svg'
import unfavoriteButton from '../../images/unfavorite-button.svg'
import { toggleFavoriteMovie } from '../../apiCalls.js'


const FavoriteButton = (props) => {
  let imagesource, altCaption
  if(props.isAFavorite) {
    imagesource = unfavoriteButton
    altCaption = 'Unfavorite this movie'
  } else {
    imagesource = favoriteButton
    altCaption = 'Favorite this movie'
  }

  const handleClick = async () => {
    await toggleFavoriteMovie(props.movieID)
    props.populateUserFeedback(props.userID)
  }

  return (
    <button className='favorite-button' onClick={handleClick}>
    <img src={imagesource} alt={altCaption}/>
    </button>
  )
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  userID: PropTypes.number.isRequired,
  movieID: PropTypes.number.isRequired,
  isAFavorite: PropTypes.bool.isRequired,
  populateUserFeedback: PropTypes.func.isRequired,
}
