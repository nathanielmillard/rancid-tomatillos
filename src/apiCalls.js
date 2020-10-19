export const getAllMovies = () => {
	return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.then(data => {
			data.movies.sort((a, b) => {
				return b.average_rating - a.average_rating;
			});
			return { loading: '', movies: data.movies, error: '' };
		})
		.catch(error => {
			console.log(error);
			return { error: 'We encountered an error, please reload page' };
		});
};

export const getOneMovie = movieID => {
	return fetch(
		`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`
	)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.then(response => {
			return { movie: response.movie, error: '' };
		})
		.catch(error => {
			return {
				movie: '',
				error: 'Something went wrong, navigate back to the homepage',
			};
		});
};

export const getUserRatings = id => {
	return fetch(
		`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`
	)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.then(ratings => {
			return ratings;
		})
		.catch(error => {
			return { error: 'Something went wrong getting your movie reviews' };
		});
};

export const rateMovie = (id, data, updateRating) => {
	return fetch(
		`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.catch(error => {
			console.log(error);
			return {
				wrongInput: '',
				error:
					'We were not able to save your rating. Please refresh and try again.',
			};
		});
};

export const logInUser = data => {
	return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.catch(error => {
			console.log('inside catch', error.message);
			this.setState({
				wrongInput: '',
				error: 'Something went wrong on our end',
			});
		});
};

export const deleteMovieRating = (id, ratingID) => {
	return fetch(
		`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings/${ratingID}`,
		{
			method: 'DELETE',
		}
	).catch(error => {
		console.log(error);
		return {
			wrongInput: '',
			error:
				'We were not able to delete your rating. Please refresh and try again.',
		};
	});
};

export const getAllMovieComments = movieID => {
	return fetch(`http://localhost:3001/api/v1/movies/${movieID}/comments`)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error;
			}
		})
		.then(data => {
			if (data.comments.length < 1) {
				return { loading: 'There are no comments for this movie' };
			} else {
				data.comments.sort((commentA, commentB) => {
					return commentB.created_at - commentA.created_at;
				});
				return { comments: data.comments, error: '', loading: '' };
			}
		})
		.catch(error => {
			console.log(error.message);
			return { error: 'We were unable to get the comments for this movie' };
		});
};

export const postMovieComment = (movieID, comment) => {
  return fetch(`http://localhost:3001/api/v1/movies/${movieID}/comments`, {
    method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(comment),    
  })
  .then(response => {
    if (response.ok) {
      console.log('comment ok!');
      return response.json();
    } else {
      throw Error;
    }
  })
  .catch(error => {
    return {
      loading: '',
      error: 'Something went wrong on our end',
    };
  });
}

export const toggleFavoriteMovie = (movie) => {
  return fetch('http://localhost:3001/api/v1/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        id: movie.id
      }
    )
  })
    .then(response => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw Error
      }
    })
    .catch(error => {
      console.log('inside catch', error.message)
    })
}

export const getUserFavorites = () => {
  return fetch('http://localhost:3001/api/v1/favorites')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    console.log('inside catch', error.message)
  })
}
