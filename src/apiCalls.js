export const getAllMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then ( response => {
      if (response.ok) {
        return response.json()
      } else {
        return { error: 'We encountered an error, please reload page' };
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
