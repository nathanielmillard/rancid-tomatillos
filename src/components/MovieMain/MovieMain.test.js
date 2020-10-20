import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {getAllMovies} from '../../apiCalls.js'

import MovieMain from './MovieMain';

jest.mock('../../apiCalls.js')

const trialMovie = {loading: '', movies: [ {
    "id": 694919,
    "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
    "title": "Money Plane",
    "average_rating": 8,
    "release_date": "2020-09-29"
  } ] }

const trialUser = {
  currentUser: {name: 'Lucy'},
  error: '',
  id: 78,
  ratings: [],
  favorites: []
}

describe('MovieMain tests', ()=> {
  it('Should display movies after fetch call', async ()=>{
    getAllMovies.mockResolvedValue(trialMovie)
    render(<MemoryRouter>
        <MovieMain
        view={'all'}
        currentUserInfo={trialUser}
        populateUserFeedback={jest.fn()}
        />
      </MemoryRouter>);
   const message = await waitFor(()=> screen.getByText('Rating: 8.0'))
   expect(message).toBeInTheDocument()
  })

  it('Should display error after fetch call fails', async ()=>{
    getAllMovies.mockResolvedValue({ loading: '', movies: [], error: 'We encountered an error, please reload page' })
    render(<MemoryRouter>
        <MovieMain
        currentUserInfo={trialUser}
        populateUserFeedback={jest.fn()}
        />
      </MemoryRouter>);
   const message = await waitFor(()=> screen.getByText('We encountered an error, please reload page'))
   expect(message).toBeInTheDocument()
  })
})
