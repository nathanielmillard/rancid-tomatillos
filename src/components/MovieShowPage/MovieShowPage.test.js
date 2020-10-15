import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getOneMovie, getUserRatings, rateMovie } from '../../apiCalls.js'

import MovieShowPage from './MovieShowPage';

jest.mock('../../apiCalls.js')

const trialMovie = {
  movie: {
    "id": 659986,
    "title": "The Owners",
    "poster_path": "https://image.tmdb.org/t/p/original//gzFatNrw0lhKD5NxaU6zC7S2KjP.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//xUUtcxWC6H48UCrpRwwSPQz69XC.jpg",
    "release_date": "2020-09-04",
    "overview": "A group of friends think they found the perfect easy score - an empty house with a safe full of cash. But when the elderly couple that lives there comes home early, the tables are suddenly turned. As a deadly game of cat and mouse ensues, the would-be thieves must fight to save themselves from a nightmare they could never have imagined.",
    "genres": "[\"Thriller\", \"Horror\", \"Action\"]",
    "budget": 0,
    "revenue": 0,
    "runtime": 92,
    "tagline": "",
    "average_rating": 8.5
  }
}

const trialRating = {
  "id": 2569,
  "user_id": 78,
  "movie_id": 659986,
  "rating": 9,
  "created_at": "2020-10-10T20:21:26.684Z",
  "updated_at": "2020-10-10T20:21:26.684Z"
}

describe('MovieShowPage', () => {
  describe('Unit Testing', () => {
    it('Should render a movie to the page', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      const mockUserRatings = jest.fn();
      const { getByText, getByAltText } = render(
        <MemoryRouter>
          <MovieShowPage
            movieID={trialMovie.movie.id}
						userMovieRatings={[]}
						userID={78}
						populateUserRatings={mockUserRatings}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const image = getByAltText('The Owners Poster');
      expect(title).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    })
    
    it('Should render a user rating if they have rated this movie', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      getUserRatings.mockResolvedValueOnce(trialRating);
      const mockUserRatings = jest.fn();
      const { getByText } = render(
        <MemoryRouter>
          <MovieShowPage
            movieID={trialMovie.movie.id}
						userMovieRatings={[trialRating]}
						userID={78}
						populateUserRatings={mockUserRatings}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const userRating = await waitFor(() => getByText('Your Rating: 9'));
      expect(title).toBeInTheDocument();
      expect(userRating).toBeInTheDocument();
    })
    
    it('Should render a form that a user can submit a rating if one is not found', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      const mockUserRatings = jest.fn();
      const { getByText } = render(
        <MemoryRouter>
          <MovieShowPage
            movieID={trialMovie.movie.id}
						userMovieRatings={[]}
						userID={78}
						populateUserRatings={mockUserRatings}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const formTitle = await waitFor(() => getByText('Rate this movie:'));
      expect(title).toBeInTheDocument();
      expect(formTitle).toBeInTheDocument();
    })
  })
})
