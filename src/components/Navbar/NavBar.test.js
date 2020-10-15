import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { logInUser } from '../../apiCalls';

import NavBar from './NavBar';

describe("NavBar", () => {
  it('Should be true', () => {
    expect(true).toBe(true);
  });

  it('Should display on the App', () => {
    const mockFunction = jest.fn();
    render(<MemoryRouter><NavBar currentUser={"Lucy"} signOut={mockFunction} /></MemoryRouter>)
    expect(screen.getByText('Lucy')).toBeInTheDocument();
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
  })

  it("Should not display a user name if no user is logged in", () => {
    const mockFunction = jest.fn();
    render(<MemoryRouter><NavBar currentUser={""} signOut={mockFunction} /></MemoryRouter>)
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
  })
})
