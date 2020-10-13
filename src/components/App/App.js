import React, { Component } from 'react';

import Navbar from '../Navbar/NavBar';
import SignIn from '../Sign-In/Sign-In';
import MovieMain from '../MovieMain/MovieMain';
import MovieShowPage from '../MovieShowPage/MovieShowPage';
import { Route, Switch, Redirect } from 'react-router-dom';

import {getOneMovie, getUserRatings} from '../../apiCalls.js'

import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: '',
			id: '',
			foundMovie: '',
			ratings: [],
			error: ''
			//maybe consider Nan lets do research
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

	findMovieShowInfo = () => {
		let movieID = parseInt(window.location.pathname.split('/')[2]);
	  if(this.state.foundMovie === '' || this.state.foundMovie.id !== movieID ) {
				getOneMovie(movieID).then(response => {
					this.setState(response)}
				)
		}
		if (this.state.error === '') {
			return <MovieShowPage movie={this.state.foundMovie} userMovieRating={this.state.ratings} userID={this.state.id} getUserRatings={this.getUserRatings} />
		} else {
			return <h1> {this.state.error} </h1>
		}
	}

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
					<Route exact path='/MovieShowPage/:movieId'
					render={this.findMovieShowInfo}/>
				</Switch>
			</main>
		);
	}
}

export default App;
