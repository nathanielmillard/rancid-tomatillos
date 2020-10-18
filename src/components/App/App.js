import React, { Component } from 'react';

import Navbar from '../Navbar/NavBar';
import SignIn from '../Sign-In/Sign-In';
import MovieMain from '../MovieMain/MovieMain';
import MovieShowPage from '../MovieShowPage/MovieShowPage';
import { Route, Switch, Redirect } from 'react-router-dom';

import {getUserRatings, getUserFavorites} from '../../apiCalls.js'

import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: '',
			id: '',
			ratings: [],
			favorites: [],
			error: ''
		};
	}

	logInUser = (user) => {
		this.setState({ currentUser: user.user.name, id: user.user.id });
		this.populateUserFeedback(this.state.currentUser.id);
		// this.setState(user.user) potential refactor later
	};

	logOutUser = () => {
		this.setState({ currentUser: '', id: '' });
		window.location.pathname = '/'
	};

	populateUserFeedback = (id) => {
		if (id) {
			getUserRatings(id).then(response => this.setState(response))
		}
		getUserFavorites().then(response => this.setState({favorites: response}))
	}

	render() {
		return (
			<Switch>
				<Route exact path='/' render={() => {
						return(
							<main>
								<Navbar
									currentUser={this.state.currentUser}
									signOut={this.logOutUser}
									favoriteView={false}
								/>
								{this.state.error && <h3>{this.state.error}</h3>}
								<MovieMain
									currentUser={this.state}
									populateUserFeedback={this.populateUserFeedback}
								/>
							</main>
						)}
					}/>
					<Route exact path='/favorites' render={() =>{
						return (
							<main>
								<Navbar
									currentUser={this.state.currentUser}
									signOut={this.logOutUser}
									favoriteView={true}
								/>
								{this.state.error && <h3>{this.state.error}</h3>}
								<MovieMain
									currentUser={this.state}
									populateUserFeedback={this.populateUserFeedback}
								/>
							</main>
						)}
					}/>
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
						return (
							<main>
								<Navbar
									currentUser={this.state.currentUser}
									signOut={this.logOutUser}
									favoriteView={false}
								/>
								<MovieShowPage
									movieID={movieID}
									userMovieRatings={this.state.ratings}
									userID={this.state.id}
									populateUserFeedback={this.populateUserFeedback}
								/>
							</main>
						)}
					}/>
			</Switch>
		);
	}
}

export default App;
