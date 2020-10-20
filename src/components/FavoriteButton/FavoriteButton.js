import React from 'react'
import PropTypes from 'prop-types';


import favoriteButton from '../../images/favorite-button.svg'
import unfavoriteButton from '../../images/unfavorite-button.svg'
import { toggleFavoriteMovie, getUserFavorites } from '../../apiCalls.js'

const FavoriteButton = (props) => {
  let imagesource = favoriteButton
  let altCaption = 'Favorite this movie'
  if(!props.isAFavorite) {
    imagesource = unfavoriteButton
    altCaption = 'Unfavorite this movie'
  }
  const handleClick = async () => {
    const response = await toggleFavoriteMovie(props.movieID)
    props.populateUserFeedback(props.userID)
  }
  return (
    <button className='favorite-button' onClick={handleClick}>
    <img src={imagesource} alt={altCaption}/>
    </button>
  )
}

//I want to take in informationa and render the appropriate button
//If this component is being rendered the assumption is that the parent element has
// already conditionally determined a user is logged in

//We then need to check the movie ID against the micro service list of favorites
//and then determine if the movie is already favorited or yet to be
//and then when a user clicks on the  component translate the favoriting to the api
//and update that faovriting's visual display

export default FavoriteButton;

FavoriteButton.propTypes = {
  userID: PropTypes.number,
  movieID: PropTypes.number,
  isAFavorite: PropTypes.bool,
  // userFavorites: PropTypes.array,
  populateUserFeedback: PropTypes.func,
}
