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
			//maybe consider Nan lets do research
		};
	}

	logInUser = user => {
		console.log(window.location);
		this.setState({ currentUser: user.user.name, id: user.user.id });
		// this.setState(user.user) potential refactor later
	};

	logOutUser = () => {
		this.setState({ currentUser: '', id: '' });
	};

	findMovieShowInfo = () => {
		let movieID = window.location.pathname.split('/')
		if(!this.state.foundMovie || this.state.foundMovie.id !== movieID){
		fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID[2]}`)
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
