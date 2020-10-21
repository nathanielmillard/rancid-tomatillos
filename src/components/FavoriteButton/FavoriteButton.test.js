import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {toggleFavoriteMovie} from '../../apiCalls.js'

import FavoriteButton from './FavoriteButton'
jest.mock('../../apiCalls.js')

describe('FavoriteButton', () => {
  it('Should render one svg if favorited', async () => {
    let mockPopulateFeedbackFunction = jest.fn()
    render (
      <MemoryRouter>
      <FavoriteButton
      userID={78}
      movieID={726739}
      isAFavorite={true}
      populateUserFeedback={mockPopulateFeedbackFunction}
      />
      </MemoryRouter>
    )
    expect(screen.getByAltText('Unfavorite this movie')).toBeInTheDocument()
  })

  it('Should render one svg if not favorited', async () => {
    let mockPopulateFeedbackFunction = jest.fn()
    render (
      <MemoryRouter>
      <FavoriteButton
      userID={78}
      movieID={726739}
      isAFavorite={false}
      populateUserFeedback={mockPopulateFeedbackFunction}
      />
      </MemoryRouter>
    )
    expect(screen.getByAltText('Favorite this movie')).toBeInTheDocument()
  })

  it('Should fire a function when clicked', async () => {
    let mockPopulateFeedbackFunction = jest.fn()
    toggleFavoriteMovie.mockResolvedValue()
    render (
      <MemoryRouter>
      <FavoriteButton
      userID={78}
      movieID={726739}
      isAFavorite={false}
      populateUserFeedback={mockPopulateFeedbackFunction}
      />
      </MemoryRouter>
    )
    userEvent.click(screen.getByAltText('Favorite this movie'))
    expect(toggleFavoriteMovie).toHaveBeenCalled()
  })

})
