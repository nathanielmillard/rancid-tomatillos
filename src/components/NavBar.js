import React from 'react';

const NavBar = ({ currentUser }) => {
	return (
		<section className='navbar-component'>
			<h1 className='navbar-title'>Rancid Tomatillos</h1>
      <button className='navbar-login'>{(!currentUser) ? 'Login' : 'Logout'}</button>
      {
        (!currentUser) ? '' : <h3 className='navbar-current-user'>{currentUser}</h3>
      }
		</section>
	);
};

export default NavBar;
