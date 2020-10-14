import React, { Component } from 'react';

import Navbar from '../Navbar/NavBar';
import SignIn from '../Sign-In/Sign-In';
import MovieMain from '../MovieMain/MovieMain';
import MovieShowPage from '../MovieShowPage/MovieShowPage';
import { Route, Switch, Redirect } from 'react-router-dom';

import {getUserRatings} from '../../apiCalls.js'

import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: '',
			id: '',
			ratings: [],
			error: ''
		};
	}

	logInUser = user => {
		this.setState({ currentUser: user.user.name, id: user.user.id });
		this.populateUserRatings();
		// this.setState(user.user) potential refactor later
	};

	logOutUser = () => {
		this.setState({ currentUser: '', id: '' });
		window.location.pathname = '/'
	};

	populateUserRatings = () => {
		getUserRatings(this.state.id).then(response => this.setState(response))
	}

	render() {
		return (
			<main>
				<Navbar
					currentUser={this.state.currentUser}
					signOut={this.logOutUser}
				/>
				{this.state.error && <h3>{this.state.error}</h3>}
				<Switch>
					<Route exact path='/' render={() => <MovieMain currentUser={this.state} />} />
					<Route
						exact
						path='/sign-in'
						render={() => {
							if (!this.state.currentUser) {
								return <SignIn logIn={this.logInUser} />;
							} else {
								return <Redirect to='/' />;
							}
						}}
					/>
					<Route exact path='/MovieShowPage/:movieID'
					render={({match}) => {
						const movieID = match.params.movieID
						return <MovieShowPage
						movieID={movieID}
						userMovieRatings={this.state.ratings}
						userID={this.state.id}
						populateUserRatings={this.populateUserRatings}
						/>
					}}/>
				</Switch>
			</main>
		);
	}
}

export default App;
