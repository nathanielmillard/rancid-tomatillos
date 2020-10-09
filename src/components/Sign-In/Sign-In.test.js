import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

import SignIn from './Sign-In';

describe('Sign-In', () => {
  it("Should render the component", () => {
    const mockSignIn = jest.fn();
    render(<SignIn logIn={mockSignIn} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  // This test will work, however it won't work until async testing is introduced.
  // it("Should log in a user on submit button click with correct credientals", () => {
  //   const mockSignIn = jest.fn();
  //   global.alert = jest.fn();
  //   render(<SignIn logIn={mockSignIn} />)
  //   userEvent.click(screen.getByText('Submit'));
  //   expect(screen.getByText('Submit')).toBeInTheDocument();
  //   expect(mockSignIn).toHaveBeenCalledWith(1);
  // });

  // Unsure about this one, but I'd imagine it would work with async testing as well
  // it("Should handle wrong username and password errors", () => {
    // const mockSignIn = jest.fn();
    // global.alert = jest.fn();
    // const mockSignInInfo = {
    //   email: 'turing@turing.io',
    //   password: '123456'
    // }
    // render(<SignIn logIn={mockSignIn} />);
    // userEvent.click(screen.getByText('Submit'));
    // expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong on our end');
  // });
})
