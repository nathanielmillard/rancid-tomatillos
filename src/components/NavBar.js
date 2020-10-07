import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = ({ currentUser }) => {
	const signInButton = <Link to='/sign-in'> <button> SignIn </button> </Link>
	const signOutButton = <Link to='/'> <button> SignOut </button> </Link>
	return (
		<section className='navbar-component'>
			<h1 className='navbar-title'>Rancid Tomatillos</h1>
			{(!currentUser) ? signInButton :	signOutButton }
      {
        (!currentUser) ? '' : <h3 className='navbar-current-user'>{currentUser}</h3>
      }
		</section>
	);
};

export default NavBar;
