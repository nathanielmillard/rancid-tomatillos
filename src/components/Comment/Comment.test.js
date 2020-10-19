import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {getAllMovies} from '../../apiCalls.js'

import Comment from './Comment';

jest.mock('../../apiCalls.js')

describe('Comment', () => {
  describe('Comment Unit Testing', () => {

  });
})
