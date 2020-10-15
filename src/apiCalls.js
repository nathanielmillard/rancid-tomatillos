export const getAllMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => {
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
        return {movie: response.movie, error: ''}
      })
    .catch(error => {
      return {movie: '', error: 'Something went wrong, navigate back to the homepage'}
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

export const rateMovie = (id, data) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    console.log(error);
    return { wrongInput: '', error: 'We were not able to save your rating. Please refresh and try again.'}
  })
}

export const logInUser = (data) => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    console.log('inside catch', error.message)
    this.setState({ wrongInput: '', error: 'Something went wrong on our end' });
  })
}

export const deleteMovieRating = (id, ratingID) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings/${ratingID}`, {
    method: 'DELETE'
  })
  .catch(error => {
    console.log(error);
    return { wrongInput: '', error: 'We were not able to delete your rating. Please refresh and try again.'}
  })
}
