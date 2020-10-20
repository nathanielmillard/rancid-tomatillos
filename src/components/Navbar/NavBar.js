import React from 'react';

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';

import './Navbar.scss'

const NavBar = (props) => {
	const signInButton = <Link className='hidden-link' to='/sign-in'>
			<button>SignIn</button>
		</Link>
	const signOutButton = <Link className='hidden-link' to='/'>
			<button onClick={props.signOut}>SignOut</button>
		</Link> 
	const viewFavoritesButton = <Link className='hidden-link' to='/favorites'>
			<button> View Favorites </button>
		</Link>
	const viewAllButton = <Link className='hidden-link' to='/'>
			<button> View All </button>
		</Link>
	return (
		<section className='navbar-component'>
			<Link to='/'><h1 className='navbar-title'>Rancid Tomatillos</h1></Link>
			{(!props.currentUser.name) ? signInButton :	signOutButton }
      {
        (!props.currentUser.name) ? '' : <h3 className='navbar-current-user'>{'Welcome back ' + props.currentUser.name}</h3>
      }
			{(props.favoriteView) ? viewAllButton : viewFavoritesButton}
		</section>
	);
};

export default NavBar;

NavBar.propTypes = {
	currentUser: PropTypes.object,
	signOut: PropTypes.func.isRequired,
	favoriteView: PropTypes.bool,
	toggleView: PropTypes.func
}
