import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {getAllMovies, getUserFavorites, logInUser, getOneMovie} from '../../apiCalls.js'

import App from './App';

jest.mock('../../apiCalls.js')
const trialMovie = {loading: '', movies: [ {
    "id": 694919,
    "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
    "title": "Money Plane",
    "average_rating": 8,
    "release_date": "2020-09-29"
  } ]}

describe('App', () => {
  it('Should display NavBar title', async () => {
    getAllMovies.mockResolvedValue(trialMovie)
    getUserFavorites.mockResolvedValue([])
    logInUser.mockResolvedValue({user: {name: 'Lucy'}})
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
  });

  it('Should log a user in if login credentials are corrent', async () => {
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    userEvent.click(screen.getByText('SignIn'))
    userEvent.type(screen.getByPlaceholderText('email'), 'lucy@turing.io')
    userEvent.type(screen.getByPlaceholderText('password'), 'password1')
    userEvent.click(screen.getByText('Submit'))
    await waitFor(()=>{ screen.getByText('Welcome back Lucy')})
    expect(screen.getByText('SignOut')).toBeInTheDocument()
  })

  it('Should display a loading message until fetch has finished', () => {
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    expect(screen.getByText('All Movies Trying To Load...')).toBeInTheDocument();
  });

  it('Should display a movie after fetch has finished', async () => {
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    await waitFor(()=> {screen.getByText('Rating: 8.0')})
    expect(screen.getByText('Rating: 8.0')).toBeInTheDocument();
  });

  it('Should display a movie\'s Show Page after it\'s clicked', async () => {
    getOneMovie.mockResolvedValue({})
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    userEvent.click(screen.getByAltText('Money Plane poster'))
    const await waitFor(()=>{ screen.getByText('Money Plane')})

  });
})
