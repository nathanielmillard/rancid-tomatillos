import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getOneMovie, getUserRatings, rateMovie } from '../../apiCalls.js'

import MovieShowPage from './MovieShowPage';

jest.mock('../../apiCalls.js')

