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
			currentUser: {},
			ratings: [],
			favorites: [],
			error: ''
		};
	}

	logInUser = (user) => {
		this.setState({ currentUser: user.user });
		this.populateUserFeedback(this.state.currentUser.id);
	};

	logOutUser = () => {
		this.setState({ currentUser: {}});
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
									currentUserInfo={this.state}
									populateUserFeedback={this.populateUserFeedback}
									view={'all'}
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
									currentUserInfo={this.state}
									populateUserFeedback={this.populateUserFeedback}
									view={'favorites'}
								/>
							</main>
						)}
					}/>
					<Route
						exact
						path='/sign-in'
						render={() => {
							if (!this.state.currentUser.name) {
								return <SignIn logIn={this.logInUser} />;
							} else {
								return <Redirect to='/' />;
							}
						}}
					/>
					<Route exact path='/MovieShowPage/:movieID'
					render={({match}) => {
						const movieID = parseInt(match.params.movieID)
						return (
							<main>
								<Navbar
									currentUser={this.state.currentUser}
									signOut={this.logOutUser}
									favoriteView={false}
								/>
								<MovieShowPage
									userFavorites={this.state.favorites}
									movieID={movieID}
									userMovieRatings={this.state.ratings}
									userID={this.state.currentUser.id}
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
