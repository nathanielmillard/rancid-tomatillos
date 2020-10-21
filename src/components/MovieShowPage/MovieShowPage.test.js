import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor, fireEvent, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { findFavorite, getOneMovie, getUserRatings, logInUser, rateMovie, deleteMovieRating, getAllMovieComments } from '../../apiCalls.js';
import MovieShowPage from './MovieShowPage';
jest.mock('../../apiCalls.js');

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

const trialSubmitRating = {
  "movie_id": 659986,
  rating: 1
}

const trialRating2 = {
  "id": 2569,
  "user_id": 78,
  "movie_id": 659986,
  "rating": 1,
  "created_at": "2020-10-10T20:21:26.684Z",
  "updated_at": "2020-10-10T20:21:26.684Z"
}

const userData = {
  email: 'lucy@turing.io',
  password: 'password1'
}

describe('MovieShowPage', () => {
    it('Should render a movie to the page', async () => {
      getOneMovie.mockResolvedValue(trialMovie);
      getAllMovieComments.mockResolvedValue([]);
      const { getByText, getByAltText } = render(
        <MemoryRouter>
          <MovieShowPage
            userFavorites={[]}
            movieID={trialMovie.movie.id}
						userMovieRatings={[]}
						userID={78}
						populateUserFeedback={jest.fn()}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const image = getByAltText('The Owners poster');
      expect(title).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    })

    it('Should render a user rating if they have rated this movie', async () => {
      getUserRatings.mockResolvedValueOnce(trialRating);
      const { getByText } = render(
        <MemoryRouter>
        <MovieShowPage
          userFavorites={[]}
          movieID={trialMovie.movie.id}
          userMovieRatings={[trialRating]}
          userID={78}
          populateUserFeedback={jest.fn()}
        />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const userRating = await waitFor(() => getByText('Your Rating: 9'));
      expect(title).toBeInTheDocument();
      expect(userRating).toBeInTheDocument();
    })

    it('Should render a form that a user can submit a rating if one is not found', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      const { getByText } = render(
        <MemoryRouter>
          <MovieShowPage
          userFavorites={[]}
          movieID={trialMovie.movie.id}
          userMovieRatings={[]}
          userID={78}
          populateUserFeedback={jest.fn()}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const formTitle = await waitFor(() => getByText('Rate this movie:'));
      expect(title).toBeInTheDocument();
      expect(formTitle).toBeInTheDocument();
    })

    it('Should inform a user of how to submit a rating with wrong input', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      const { getByText, getByRole } = render(
        <MemoryRouter>
          <MovieShowPage
          userFavorites={[]}
          movieID={trialMovie.movie.id}
          userMovieRatings={[]}
          userID={78}
          populateUserFeedback={jest.fn()}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'));
      const formTitle = await waitFor(() => getByText('Rate this movie:'));
      expect(title).toBeInTheDocument();
      expect(formTitle).toBeInTheDocument();
      userEvent.click(getByRole('button', { name : 'Submit Rating'}));
      const message = await waitFor(() => getByText('The number can only be a whole number between 1 and 10'));
      expect(message).toBeInTheDocument();
    })

    it('Should allow a user to submit a new rating', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      logInUser.mockResolvedValueOnce(userData);
      rateMovie.mockResolvedValue(trialSubmitRating)
      const { getByText, getByRole, getByTestId } = render(
        <MemoryRouter>
          <MovieShowPage
          userFavorites={[]}
          movieID={trialMovie.movie.id}
          userMovieRatings={[]}
          userID={78}
          populateUserFeedback={jest.fn()}
          />
        </MemoryRouter>)
      const title = await waitFor(() => getByText('The Owners'))
      userEvent.type(getByRole('spinbutton'), '1');
      expect(getByRole('spinbutton')).toHaveValue(1);
      userEvent.click(getByText('Submit Rating'));
      expect(rateMovie).toHaveBeenCalled()
    })

    it('Should allow a user to delete their rating', async () => {
      getOneMovie.mockResolvedValueOnce(trialMovie);
      deleteMovieRating.mockResolvedValue();
      getUserRatings.mockResolvedValueOnce([]);
      getAllMovieComments.mockResolvedValue([])
      const mockUserRatings = jest.fn();
      const { getByText, getByRole } = render(
        <MemoryRouter>
        <MovieShowPage
          userFavorites={[]}
          movieID={trialMovie.movie.id}
          userMovieRatings={[trialRating]}
          userID={78}
          populateUserFeedback={mockUserRatings}
        />
        </MemoryRouter>)
      const movieWithRating = await waitFor(() => getByText('Your Rating: 9'));
      userEvent.click(getByRole('button', { name: 'Delete Rating'}));
      const movieWithoutRating = await waitFor(() => getByText('The Owners'));
      expect(mockUserRatings).toHaveBeenCalledTimes(1);
    })
})
