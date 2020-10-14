import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import MovieTile from './MovieTile';

describe('MovieTile', () => {
	it('Should render a MovieTile', () => {
    let trialMovie = {
      average_rating: 1,
      backdrop_path: "https://image.tmdb.org/t/p/original//eIqyISB5j99OSRZUuvdN9g2bBsS.jpg",
      id: 619592,
      poster_path: "https://image.tmdb.org/t/p/original//ucktgbaMSaETUDLUBp1ubGD6aNj.jpg",
      release_date: "2020-07-02",
      title: "Force of Nature",
    }
    render(<MemoryRouter><MovieTile
      movie={trialMovie}
			key={3}
			userMovieRating={[]}
    /></MemoryRouter>)
    expect(screen.getByText('Rating: 1.0')).toBeInTheDocument();
    expect(screen.getByAltText(`${trialMovie.title} poster`)).toBeInTheDocument();
  });
});
