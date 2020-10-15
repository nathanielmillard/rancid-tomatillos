import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

import SignIn from './Sign-In';

import { logInUser } from '../../apiCalls'

jest.mock('../../apiCalls.js')

describe('Sign-In', () => {
  it("Should render the component", () => {
    const mockSignIn = jest.fn();
    render(<SignIn logIn={mockSignIn} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it("Should log in a user on submit button click with correct credientals", async () => {
    const userData = {
      email: 'lucy@turing.io',
      password: 'password1'
    }
    logInUser.mockResolvedValue(userData)
    const mockSignIn = jest.fn();
    render(<SignIn logIn={mockSignIn} />)
    userEvent.type(screen.getByPlaceholderText('email'), userData.email);
    userEvent.type(screen.getByPlaceholderText('password'), userData.password);
    userEvent.click(screen.getByText('Submit'));
  });

  it("Should handle wrong username and password errors", () => {
    const mockSignIn = jest.fn();
    render(<SignIn logIn={mockSignIn} />);
    userEvent.click(screen.getByText('Submit'));
    const message = screen.getByText('Wrong email or password');
    expect(message).toBeInTheDocument();
  });
})
