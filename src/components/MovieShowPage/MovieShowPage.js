import React from 'react'

const MovieShowPage = (props) => {
  const foundRating = props.userMovieRating.find(rating => rating.movie_id === props.movie.id)
  return (
  <section className='movie-show-page'>
    <img className='background' src={props.movie.backdrop_path} alt={props.movie.title + 'backdrop'}/>
    <div className="movie-section">
      <img className='main-poster' src={props.movie.poster_path}  alt={props.movie.title + 'poster'}/>
      <div className='movie-info'>
        <h1>{props.movie.title}</h1>
        <h2>Release Date: {props.movie.release_date} </h2>
        <h3>Rating: {props.movie.average_rating} </h3>
        { (foundRating) ? 
          <h3 className='movie-user-rating'>Your Rating: {foundRating.rating}</h3> : 
          <label htmlFor='rating'>Rating:
            <input type='number' value='5' min='1' max='10' />
            <button>Submit</button>
          </label>
        }
        <p>{props.movie.overview}</p>
      </div>
    </div>
  </section>
)
}

export default MovieShowPage
