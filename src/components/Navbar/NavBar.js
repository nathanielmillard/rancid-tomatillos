import React from 'react';

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';

import './Navbar.scss'

const NavBar = (props) => {
	const signInButton = <Link className='hidden-link' to='/sign-in'><button>SignIn</button>
	</Link>
	const signOutButton =  <button onClick={props.signOut}> SignOut </button>
	return (
		<section className='navbar-component'>
			<Link to='/'><h1 className='navbar-title'>Rancid Tomatillos</h1></Link>
			{(!props.currentUser) ? signInButton :	signOutButton }
      {
        (!props.currentUser) ? '' : <h3 className='navbar-current-user'>{'Welcome back ' + props.currentUser}</h3>
      }
		</section>
	);
};

export default NavBar;

NavBar.propTypes = {
	currentUser: PropTypes.string,
	signOut: PropTypes.func.isRequired,
}
