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


