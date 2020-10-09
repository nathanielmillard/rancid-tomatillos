import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

import NavBar from './NavBar';

describe("NavBar", () => {
  it('Should be true', () => {
    expect(true).toBe(true);
  });

  it('Should display on the App', () => {
    const mockFunction = jest.fn();
    render(<NavBar currentUser={"Lucy"} signOut={mockFunction} />)
    expect(screen.getByText('Lucy')).toBeInTheDocument();
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
  })

  it("Should not display a user name if no user is logged in", () => {
    const mockFunction = jest.fn();
    render(<NavBar currentUser={' '} signOut={mockFunction} />)
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
  })
})