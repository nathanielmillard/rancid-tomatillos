import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('Should have default test', () => {
    expect(true).toBe(true);
  });

  it('Should render App to the screen', () => {
    render(<BrowserRouter>
      <App />
    </BrowserRouter>);
  });

  it('Should display a loading message until fetch has finished', () => {
    render(<BrowserRouter>
      <App />
    </BrowserRouter>);
    expect(screen.getByText('All Movies Trying To Load...')).toBeInTheDocument();
  });

  // Add additional tests after async testing lesson
})
