import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Comments from './Comments';
import { getAllMovieComments } from '../../apiCalls';

jest.mock('../../apiCalls.js');

const mockNoComments = {
  comments: [],
  loading: 'There are no comments for this movie'
};

const mockMovieComments = {
  comments: [
    {
      "id": 1602971357907,
      "movieId": 446893,
      "author": "Lucy",
      "comment": "This movie is magical!",
      "created_at": Date.now()
    }
  ]
}

describe('Comments', () => {
  it('Should show that a user has to be logged in to comment on a movie', async () => {
    getAllMovieComments.mockResolvedValueOnce(mockNoComments);
    const { getByText } = render(
      <MemoryRouter>
        <Comments movieID={446893} userID={''} />
      </MemoryRouter>
    )
    const message = await waitFor(() => getByText('Login to comment on this movie!'));
    expect(message).toBeInTheDocument();
  });

  it('Should show a user when a movie has no comments', async () => {
    getAllMovieComments.mockResolvedValueOnce(mockNoComments);
    const { getByText } = render(
      <MemoryRouter>
        <Comments movieID={446893} userID={''} />
      </MemoryRouter>
    )
    const message = await waitFor(() => getByText('There are no comments for this movie'));
    expect(message).toBeInTheDocument();
  });

  it('Should show a user when a movie has comments logged in or not logged in', async () => {
    getAllMovieComments.mockResolvedValueOnce(mockMovieComments);
    const { getByText } = render(
      <MemoryRouter>
        <Comments movieID={446893} userID={''} />
      </MemoryRouter>
    )
    const message = await waitFor(() => getByText('This movie is magical!'));
    expect(message).toBeInTheDocument();
  });
})
