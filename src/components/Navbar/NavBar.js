import React from 'react';

import { Link } from 'react-router-dom'

const NavBar = (props) => {
	const signInButton = <Link to='/sign-in'><button>SignIn</button>
	</Link>
	const signOutButton =  <button onClick={props.signOut}> SignOut </button>
	return (
		<section className='navbar-component'>
			<h1 className='navbar-title'>Rancid Tomatillos</h1>
			{(!props.currentUser) ? signInButton :	signOutButton }
      {
        (!props.currentUser) ? '' : <h3 className='navbar-current-user'>{props.currentUser}</h3>
      }
		</section>
	);
};

export default NavBar;
