import React, { Component } from 'react';

import Navbar from './components/Navbar/NavBar';
import SignIn from './components/Sign-In/Sign-In';
import MovieMain from './components/MovieMain/MovieMain';
import MovieShowPage from './components/MovieShowPage/MovieShowPage';
import { Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: '',
			id: '',
			foundMovie: '',
			ratings: []
			//maybe consider Nan lets do research
		};
	}

	logInUser = user => {
		this.setState({ currentUser: user.user.name, id: user.user.id });
		this.getUserRatings();
		// this.setState(user.user) potential refactor later
	};

	logOutUser = () => {
		this.setState({ currentUser: '', id: '' });
		window.location.pathname = '/'
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
		return <MovieShowPage movie={this.state.foundMovie} userMovieRating={this.state.ratings} userID={this.state.id} getUserRatings={this.getUserRatings} />
	}

	getUserRatings = () => {
		fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.state.id}/ratings`)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(ratings => this.setState(ratings))
			.catch(error => {
				console.log(error)
				alert('Something went wrong getting your movie reviews')
			})
	}

	render() {
		return (
			<main>
				<Navbar
					currentUser={this.state.currentUser}
					signOut={this.logOutUser}
				/>
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
