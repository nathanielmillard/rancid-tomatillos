export const getAllMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then ( response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error
      }
    })
    .then(data => {
      data.movies.sort((a,b)=>{
       return b.average_rating - a.average_rating
      })
      return({loading: '', movies: data.movies, error: '' })
    })
    .catch(error => {
      console.log(error)
      return({ error: 'We encountered an error, please reload page' });
    }
    );
}

export const getOneMovie = (movieID) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error
      }
    })
    .then(response => {
        return {foundMovie: response.movie, error: ''}
      })
    .catch(error => {
      return {foundMovie: '', error: 'Something went wrong, navigate back to the homepage'}
    })
}

export const getUserRatings = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error
      }
    })
    .then(ratings =>{
      return ratings
    })
    .catch(error => {
      return {error: 'Something went wrong getting your movie reviews'}
    })
}
