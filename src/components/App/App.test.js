import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {getAllMovies} from '../../apiCalls.js'

import App from './App';

// jest.mock('../../apiCalls.js')


describe('App', () => {
  it('Should display a loading message until fetch has finished', () => {
    // getAllMovies.mockResolvedValue(trialMovie)
    render(<MemoryRouter>
      <App />
      </MemoryRouter>);
    expect(screen.getByText('All Movies Trying To Load...')).toBeInTheDocument();
  });
  // Add additional tests after async testing lesson
})
