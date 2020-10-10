import React, { Component } from 'react';

import Navbar from './components/Navbar/NavBar';
import SignIn from './components/Sign-In/Sign-In';
import MovieMain from './components/MovieMain/MovieMain';
import MovieShowPage from './components/MovieShowPage/MovieShowPage';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: '',
			id: '',
			foundMovie: '',
			//maybe consider Nan lets do research
		};

		// Custom Movie Ratings is an object with a key/value pair where value is an array
		// each rating should be an object where
			// it has the ID of the movie with the rating
			// the rating of the movie in integer format 1 - 10
	}

	logInUser = user => {
		console.log(window.location);
		this.setState({ currentUser: user.user.name, id: user.user.id });
		// get fetch data for user rating info here
		// this.setState(user.user) potential refactor later
	};

	logOutUser = () => {
		this.setState({ currentUser: '', id: '' });
		return <MovieMain />
	};

	findMovieShowInfo = () => {
		let movieID = parseInt(window.location.pathname.split('/')[2]);
		if(!this.state.foundMovie || this.state.foundMovie.id !== movieID){
		fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`)
			.then(response => {
				if (response.ok) {
				return response.json()
			}})
			.then(response => {
					this.setState({foundMovie: response.movie})
				})
			.catch(error => {
				console.log(error)
				alert('Something went wrong, navigate back to the homepage')
			})
		}
		return <MovieShowPage movie={this.state.foundMovie} />
		// add user rating here as well
	}

	render() {
		return (
			<main>
				<Navbar
					currentUser={this.state.currentUser}
					signOut={this.logOutUser}
				/>
				<Switch>
					<Route exact path='/' component={MovieMain} />
					<Route
						exact
						path='/sign-in'
						render={() => {
							if (this.state.currentUser === 'Lucy') {
								return <Redirect to='/' />;
							} else {
								return <SignIn logIn={this.logInUser} />;
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
