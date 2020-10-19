import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Comment from './Comment';

const mockComment = {
  id: 101,
  author: 'Lucy',
  comment: 'This is a test',
  created_at: Date.now()
}

describe('Comment', () => {
  it.only('Should render a comment to the screen', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Comment comment={mockComment}/>
      </MemoryRouter>
    )
    expect(getByText('This is a test')).toBeInTheDocument();
  });
})
